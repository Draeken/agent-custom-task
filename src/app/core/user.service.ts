import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WindowRef } from '../core/window.provider';

@Injectable()
export class UserService {
  private isLoggedObs: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private userToken: string;
  private readonly userTokenKey = 'user-token';

  constructor(private windowRef: WindowRef,
              private http: Http) {
    this.initLoggin();
  }

  get isLogged(): boolean {
    return this.isLoggedObs.value;
  }

  login(token: string): Observable<boolean> {
    const serverUrl = this.getServerAPIAddress();
    const dataLogin = {
      temp_token: token
    };

    return this.http.post(serverUrl + `user/login/`, dataLogin, this.getJsonHeader())
      .map(this.extractBody)
      .map(this.handleUserLogin.bind(this));
  }

  private initLoggin(): void {
    try {
      const token = this.getToken();
      if (!token) { console.log('no token'); return; }
      this.userToken = token;
      // Could check on server
      this.isLoggedObs.next(true);
    } catch (e) { console.log(e); }
  }

  private handleUserLogin(body: any): boolean {
    if (!body) { console.error(`No server response.`); return false; }
    const userToken = body.token;
    if (!userToken) { console.error(`No token.`, body); return false; }
    this.setToken(userToken);
    this.userToken = userToken;
    this.isLoggedObs.next(true);
    console.log('User is now logged.');
    return true;
  }

  private getServerAPIAddress(): string {
    return `${this.windowRef.nativeWindow.location.protocol}//${this.windowRef.nativeWindow.location.hostname}:3001/`;
  }

  private getJsonHeader(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  private getToken(): string {
    return localStorage.getItem(this.userTokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.userTokenKey, token);
  }

  private extractBody(res: Response): any {
    let body;
    try {
      body = res.json();
    } catch (e) {
      body = undefined;
    }
    return body;
  }

}
