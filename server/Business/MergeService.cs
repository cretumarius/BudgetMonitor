using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using Business.Base;
using Business.BusinessContract;
using Business.Constants;
using IronPdf;

namespace Business
{
    public class MergeService : IMergeService
    {
        private readonly IAzureBlobContainerClient _blobContainerClient;

        public MergeService(AzureBlobContainerClientFactory azureBlobContainerFactory)
        {
            _blobContainerClient = azureBlobContainerFactory(BlobContainerNames.DocumentsContainerName);
        }

        public async Task<MemoryStream> Merge(string folder)
        {
            PdfDocument mergedPdf = null;
            var resultSegment = _blobContainerClient.GetBlobsAsync(folder);

            await foreach (var blobPage in resultSegment)
            {
                foreach (var blobItem in blobPage.Values)
                {
                    var blobClient = _blobContainerClient.GetBlobClient(blobItem.Name);
                    PdfDocument toAppend = null;
                    string extension = Path.GetExtension(blobItem.Name);

                    if (extension == FileExtensions.PdfExtension)
                    {
                        if (mergedPdf != null) toAppend = new PdfDocument(blobClient.OpenRead());
                        else mergedPdf = new PdfDocument(blobClient.OpenRead());

                    }
                    else
                    {
                        if (mergedPdf != null) toAppend = ImageToPdfConverter.ImageToPdf(Image.FromStream(blobClient.OpenRead()));
                        else mergedPdf = ImageToPdfConverter.ImageToPdf(Image.FromStream(blobClient.OpenRead()));

                    }
                    if (toAppend != null)
                    {
                        mergedPdf.AppendPdf(toAppend);
                    }
                }
            }
            return mergedPdf.Stream;
        }
    }
}
