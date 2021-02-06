using System;
using DataAccess.Base.Context;
using Domain.OCR;

namespace DataAccess.Repository
{
    public class OcrResultRepository : BaseRepository<OcrResult>, IOcrResultRepository
    {
        public OcrResultRepository(IDataContext dataContext) : base(dataContext)
        {
        }

        public void AddResult(OcrResult ocrResult)
        {
            Add(ocrResult);
        }

        public OcrResult GetResultById(Guid id)
        {
            return GetById(id);
        }
    }
}
