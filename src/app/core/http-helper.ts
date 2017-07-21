import { RequestOptions, Headers, Response } from '@angular/http';

export class HttpHelper {

  static getJsonHeader(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  static extractBody(res: Response): any {
    let body;
    try {
      body = res.json();
    } catch (e) {
      body = undefined;
    }
    return body;
  }
}
