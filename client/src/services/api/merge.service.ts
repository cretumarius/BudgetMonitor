import { BaseService } from './base.service';
import { FetchBlobResponse } from 'rn-fetch-blob';
import { Download } from '_core';

const uploadDocsApiUrl = '/Merge/uploadDocuments';
const mergeDocsApiUrl = '/Merge/mergeDocuments';

export class MergeService extends BaseService {
  public async mergeDocuments(files: FormData, token: string): Promise<any> {
    return this.api.post(`${uploadDocsApiUrl}`, files, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-Type': 'multipart/form-data',
      },
      onUploadProgress: (value) => console.log(value),
    });
  }

  public async downloadPdf(folder: string): Promise<FetchBlobResponse> {
    return Download.file(`${this.api.getBaseURL()}${mergeDocsApiUrl}?folder=${folder}`, 'merged', '.pdf');
  }
}
