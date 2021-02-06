using System;
using System.IO;

namespace Business.BusinessContract
{
    public interface IExportService
    {
        MemoryStream ExportPdf(Guid resultId);

        MemoryStream ExportWord(Guid resultId);
    }
}
