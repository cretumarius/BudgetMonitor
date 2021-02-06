using System;
using Business.BusinessModels.Response;
using Microsoft.AspNetCore.Http;

namespace Business.BusinessContract
{
    public interface IOCRService
    {
        OcrResponse ExtractText(Guid userId, IFormFile image);
    }
}
