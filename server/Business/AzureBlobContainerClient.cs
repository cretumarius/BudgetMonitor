using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Business.BusinessContract;
using Microsoft.AspNetCore.Http;

namespace Business
{
    public delegate IAzureBlobContainerClient AzureBlobContainerClientFactory(string key);

    public class AzureBlobContainerClient : IAzureBlobContainerClient
    {
        private readonly BlobContainerClient _blobContainerClient;

        public AzureBlobContainerClient(BlobContainerClient blobContainerClient)
        {
            _blobContainerClient = blobContainerClient;
        }

        public void CreateIfNotExists()
        {
            //_blobContainerClient.CreateIfNotExists();
        }

        public IAsyncEnumerable<Page<BlobItem>> GetBlobsAsync(string folderName)
        {
            return _blobContainerClient.GetBlobsAsync(BlobTraits.None, BlobStates.None, folderName).AsPages();
        }
        public BlobClient GetBlobClient(string name)
        {
            return _blobContainerClient.GetBlobClient(name);
        }

        public async Task UploadFileAsync(string fileName, Stream stream)
        {
            if (GetBlobClient(fileName) != null)
            {
                await DeleteFile(fileName);
            }
            await _blobContainerClient.UploadBlobAsync(fileName, stream);
        }

        public async Task UploadFilesAsync(IList<IFormFile> files, string destFolderName = null)
        {
            var tasks = new List<Task>();

            foreach (var formFile in files.Where(f => f.Length > 0))
            {
                tasks.Add(UploadFileAsync(formFile, destFolderName));
            }

            await Task.WhenAll(tasks);
        }

        private async Task UploadFileAsync(IFormFile file, string folderName)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            memoryStream.Position = 0;
            await _blobContainerClient.UploadBlobAsync(
                Path.Combine(folderName ?? string.Empty, file.FileName), memoryStream);
        }

        public async Task DeleteFile(string path)
        {
            var blob = _blobContainerClient.GetBlobClient(path);
            await blob.DeleteIfExistsAsync();
        }

        public async Task<string> GetBase64BlobContent(string path)
        {
            var blob = _blobContainerClient.GetBlobClient(path);

            using (var memoryStream = new MemoryStream())
            {
                await blob.DownloadToAsync(memoryStream);
                return Convert.ToBase64String(memoryStream.ToArray());
            }
        }

        public async Task DeleteDirectoryAsync(string folderName)
        {
            var blobPages = GetBlobsAsync(folderName);
            var deleteTasks = new List<Task>();

            await foreach (var blobPage in blobPages)
            {
                foreach (var blobItem in blobPage.Values)
                {
                    var blob = _blobContainerClient.GetBlobClient(blobItem.Name);
                    deleteTasks.Add(blob.DeleteIfExistsAsync());
                }
            }

            await Task.WhenAll(deleteTasks);
        }
    }
}
