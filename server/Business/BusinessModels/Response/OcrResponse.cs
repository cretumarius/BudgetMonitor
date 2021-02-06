using System;
namespace Business.BusinessModels.Response
{
    public class OcrResponse
    {
        public string Text { get; set; }

        public Guid ResultId { get; set; }
    }
}
