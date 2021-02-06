using Business.BusinessContract;
using System.IO;
using IronPdf;
using System;
using Domain.OCR;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace Business
{
    public class ExportService : IExportService
    {
        private readonly IOcrResultRepository ocrResultRepository;

        public ExportService(IOcrResultRepository ocrResultRepository)
        {
            this.ocrResultRepository = ocrResultRepository;
        }

        public MemoryStream ExportPdf(Guid resultId)
        {
            var text = ocrResultRepository.GetResultById(resultId)?.Text;

            var Renderer = new HtmlToPdf();
            var merged = Renderer.RenderHtmlAsPdf($"<p>{text}<strong>").SaveAs("export.pdf");
            return merged.Stream;
        }

        public MemoryStream ExportWord(Guid resultId)
        {
            var text = ocrResultRepository.GetResultById(resultId)?.Text;
            // open xml sdk - docx
            using (MemoryStream mem = new MemoryStream())
            {
                using (WordprocessingDocument wordDoc = WordprocessingDocument.Create(mem, WordprocessingDocumentType.Document, true))
                {
                    wordDoc.AddMainDocumentPart();
                    Document doc = new Document();
                    Body body = new Body();

                    Paragraph para = new Paragraph();

                    ParagraphProperties paragraphProperties1 = new ParagraphProperties();
                    ParagraphStyleId paragraphStyleId1 = new ParagraphStyleId() { Val = "Normal" };
                    Justification justification1 = new Justification() { Val = JustificationValues.Center };
                    ParagraphMarkRunProperties paragraphMarkRunProperties1 = new ParagraphMarkRunProperties();

                    paragraphProperties1.Append(paragraphStyleId1);
                    paragraphProperties1.Append(justification1);
                    paragraphProperties1.Append(paragraphMarkRunProperties1);

                    Run run = new Run();
                    RunProperties runProperties1 = new RunProperties();

                    Text title = new Text() { Text = "Exported" };

                    run.Append(runProperties1);
                    run.Append(title);
                    para.Append(paragraphProperties1);
                    para.Append(run);

                    Paragraph para2 = new Paragraph();

                    ParagraphProperties paragraphProperties2 = new ParagraphProperties();
                    ParagraphStyleId paragraphStyleId2 = new ParagraphStyleId() { Val = "Normal" };
                    Justification justification2 = new Justification() { Val = JustificationValues.Both };
                    ParagraphMarkRunProperties paragraphMarkRunProperties2 = new ParagraphMarkRunProperties();

                    paragraphProperties2.Append(paragraphStyleId2);
                    paragraphProperties2.Append(justification2);
                    paragraphProperties2.Append(paragraphMarkRunProperties2);

                    Run run2 = new Run();
                    RunProperties runProperties3 = new RunProperties();

                    run2.AppendChild(new Break());
                    run2.AppendChild(new Text(text));

                    para2.Append(paragraphProperties2);
                    para2.Append(run2);

                    body.Append(para);
                    body.Append(para2);

                    doc.Append(body);

                    wordDoc.MainDocumentPart.Document = doc;

                    wordDoc.Close();
                }
                return mem;
                
            }
        }
    }
}
