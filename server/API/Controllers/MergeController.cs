using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using Business.BusinessContract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MergeController : ControllerBase
    {
        private readonly IUploadService uploadService;
        private readonly IMergeService mergeService;

        public MergeController(IUploadService uploadService, IMergeService mergeService)
        {
            this.uploadService = uploadService;
            this.mergeService = mergeService;
        }
        //[Authorize]
        [Consumes("multipart/form-data")]
        [HttpPost("uploadDocuments")]
        public async Task<IActionResult> UploadDocuments(List<IFormFile> files)
        {
            //var user = (User)HttpContext.Items.First().Value;
            var folderName = await uploadService.UploadFilesToStorage(files);
            return Ok(folderName);
        }

        //[Authorize]
        [HttpGet("mergeDocuments")]
        public async Task<IActionResult> MergeDocuments(string folder)
        {
            //var user = (User)HttpContext.Items.First().Value;
            var stream = await mergeService.Merge(folder);
            return File(stream.ToArray(), "application/pdf", "Exported.pdf");
        }
    }
}