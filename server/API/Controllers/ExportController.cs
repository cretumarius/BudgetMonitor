using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Helpers;
using Business.BusinessContract;
using Business.BusinessModels.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ExportController : ControllerBase
    {
        private readonly IExportService exportService;

        public ExportController(IExportService export)
        {
            this.exportService = export;
        }

        //[Authorize]
        [HttpGet("exportPdf")]
        public IActionResult ExportPdf(Guid ocrResultId)
        {
            var stream = exportService.ExportPdf(ocrResultId);
            return File(stream.ToArray(), "application/pdf", "Exported.pdf");
        }

        [HttpGet("exportWord")]
        public IActionResult ExportWord(Guid ocrResultId)
        {
            var stream = exportService.ExportWord(ocrResultId);

            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "Exported.docx");
        }
    }
}