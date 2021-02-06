import { BaseService } from './base.service';
import { FetchBlobResponse } from 'rn-fetch-blob';
import { Download } from '_core';
import { OcrResponseModel } from '_models';

const exportPdfApiUrl = '/Export/exportPdf';
const exportWordApiUrl = '/Export/exportWord';

export class ExportService extends BaseService {
  Extensions = {
    Pdf: '.pdf',
    Word: '.docx',
  };

  public async downloadPdf(ocr: OcrResponseModel): Promise<FetchBlobResponse> {
    return Download.file(`${this.api.getBaseURL()}${exportPdfApiUrl}?ocrResultId=${ocr.resultId}`, this.Extensions.Pdf);
  }

  public async downloadWord(ocr: OcrResponseModel): Promise<FetchBlobResponse> {
    return Download.file(
      `${this.api.getBaseURL()}${exportWordApiUrl}?ocrResultId=${ocr.resultId}`,
      this.Extensions.Word,
    );
  }
}
