using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;

namespace Business.BusinessContract
{
    public interface IAzureBlobContainerClient
    {
        void CreateIfNotExists();
        Task UploadFileAsync(string fileName, Stream stream);
        Task UploadFilesAsync(IList<IFormFile> files, string destFolderName = null);
        IAsyncEnumerable<Page<BlobItem>> GetBlobsAsync(string folderName);
        BlobClient GetBlobClient(string name);
        Task DeleteFile(string path);
        Task<string> GetBase64BlobContent(string path);
        Task DeleteDirectoryAsync(string folderName);
    }
}
