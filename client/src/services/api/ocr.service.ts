import { BaseService } from './base.service';
import { ApiResponse } from 'apisauce';
import { OcrResponseModel } from '_models';

const extractTextApiUrl = '/OCR/extractText';

export class OcrService extends BaseService {
  public async extractText(data: FormData, token: string): Promise<ApiResponse<OcrResponseModel>> {
    return this.api.post(`${extractTextApiUrl}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-Type': 'multipart/form-data',
      },
      onUploadProgress: (value) => console.log(value),
    });
  }
}
