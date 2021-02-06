using System.Linq;
using API.Helpers;
using Business.BusinessContract;
using Domain.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [ApiController]
    [Route("[controller]")]
    public class OCRController : ControllerBase
    {
        private readonly IOCRService ocr;

        public OCRController(IOCRService ocr)
        {
            this.ocr = ocr;
        }

        [Authorize]
        [Consumes("multipart/form-data")]
        [HttpPost("extractText")]
        public IActionResult ExtractText(IFormFile image)
        {
            //TODO: move user in a base class to easy access
            var user = (User)HttpContext.Items.First().Value;
            var ocrResponse = ocr.ExtractText(user.Id, image);
            return Ok(ocrResponse);
        }
    }
}