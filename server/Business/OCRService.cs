using System;
using System.IO;
using System.Linq;
using AutoMapper;
using Business.Base;
using Business.BusinessContract;
using Business.BusinessModels.Response;
using Domain.Base;
using Domain.OCR;
using Google.Cloud.Vision.V1;
using Microsoft.AspNetCore.Http;

namespace Business
{
    public class OCRService : ServiceBase, IOCRService
    {
        private readonly IOcrResultRepository orcResultRepository;
        private ImageAnnotatorClient client;

        public OCRService(IUnitOfWork unitOfWork,
            IMapper mapper, IOcrResultRepository orcResultRepository) : base(unitOfWork, mapper)
        {
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "/Users/mariuscretu/Projects/CloudVisionTest/CloudVisionTest/test-1198783b050a.json");
            this.orcResultRepository = orcResultRepository;
            client = ImageAnnotatorClient.Create();
        }

        public OcrResponse ExtractText(Guid userId, IFormFile image)
        {
            using var memoryStream = new MemoryStream();
            image.CopyTo(memoryStream);
            memoryStream.Position = 0;
            var img = Image.FromStream(memoryStream);
            var response = client.DetectText(img).First();

            var result = response.Description;

            var ocrResult = OcrResult.CreateResult(userId, result);
            orcResultRepository.AddResult(ocrResult);
            UnitOfWork.Commit();

            return new OcrResponse
            {
                Text = response.Description,
                ResultId = ocrResult.Id
            };
        }
    }
}
