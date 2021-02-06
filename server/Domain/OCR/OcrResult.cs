using System;
using Domain.Base.EntityBase;
using Domain.Users;

namespace Domain.OCR
{
    public class OcrResult : EntityBase<Guid>
    {
        private OcrResult() { }

        private OcrResult(Guid UserId, string Text)
        {
            Id = Guid.NewGuid();
            this.Text = Text;
            this.UserId = UserId;
        }

        public string Text { get; private set; }

        public User User { get; set; }

        public Guid UserId { get; set; }

        public static OcrResult CreateResult(Guid userId, string text)
        {
            return new OcrResult(userId, text);
        }
    }
}
