import { BaseService } from './base.service';
import { ApiResponse } from 'apisauce';
import { AuthenticationRequestModel, AuthenticationResponseModel, RegisterRequestModel } from '_models';

const authenticationApiUrl = '/Account/authenticate';
const registerApiUrl = '/Account/register';

export class AccountService extends BaseService {
  public authenticate(credentials: AuthenticationRequestModel): Promise<ApiResponse<AuthenticationResponseModel>> {
    return this.api.post(`${authenticationApiUrl}`, credentials);
  }

  public register(registerModel: RegisterRequestModel): Promise<ApiResponse<AuthenticationResponseModel>> {
    return this.api.post(`${registerApiUrl}`, registerModel);
  }
}
