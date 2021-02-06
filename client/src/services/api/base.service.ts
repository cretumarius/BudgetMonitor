import { ApisauceInstance, create } from 'apisauce';

export class BaseService {
  protected api: ApisauceInstance;

  constructor() {
    this.api = create({
      baseURL: 'https://20f007de30ef.eu.ngrok.io',
    });
  }
}
