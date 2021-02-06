using System;
using Domain.OCR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class OcrResultConfiguration : IEntityTypeConfiguration<OcrResult>
    {

        public void Configure(EntityTypeBuilder<OcrResult> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
        }
    }
}
