using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Business.Base;
using Business.BusinessContract;
using Microsoft.AspNetCore.Http;

namespace Business
{
    public class UploadService : IUploadService
    {
        private readonly IAzureBlobContainerClient _blobContainerClient;

        public UploadService(AzureBlobContainerClientFactory azureBlobContainerFactory)
        {
            _blobContainerClient = azureBlobContainerFactory(BlobContainerNames.DocumentsContainerName);
        }

        public async Task<string> UploadFilesToStorage(List<IFormFile> files)
        { 
            var folderName = Guid.NewGuid().ToString();
            try
            {

            await _blobContainerClient.UploadFilesAsync(files, destFolderName:folderName);
            }
            catch(Exception e)
            {
                throw e;
            }
            return folderName;
        }
    }
}
