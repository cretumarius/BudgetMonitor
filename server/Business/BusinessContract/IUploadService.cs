using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Business.BusinessContract
{
    public interface IUploadService
    {
        Task<string> UploadFilesToStorage(List<IFormFile> files);
    }
}
