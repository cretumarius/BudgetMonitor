using System;

namespace Domain.OCR
{
    public interface IOcrResultRepository
    {
        void AddResult(OcrResult ocrResult);

        OcrResult GetResultById(Guid id);
    }
}
