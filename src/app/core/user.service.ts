import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WindowRef } from '../core/window.provider';
import { HttpHelper } from '../core/http-helper';

@Injectable()
export class UserService {
  private _isLoggedObs: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _userToken: string;
  private readonly userTokenKey = 'user-token';

  constructor(private windowRef: WindowRef,
              private http: Http) {
    this.initLoggin();
  }

  get isLogged(): boolean {
    return this._isLoggedObs.value;
  }

  get isLoggedObs(): Observable<boolean> {
    return this._isLoggedObs as Observable<boolean>;
  }

  get userToken(): { user_token: string } {
    return {
      user_token: this._userToken
    };
  }

  login(token: string): Observable<boolean> {
    const serverUrl = this.getServerAPIAddress();
    const dataLogin = {
      temp_token: token
    };

    return this.http.post(serverUrl + `user/login/`, dataLogin, HttpHelper.getJsonHeader())
      .map(HttpHelper.extractBody)
      .map(this.handleUserLogin.bind(this));
  }

  private initLoggin(): void {
    try {
      const token = this.getToken();
      if (!token) { console.log('no token'); return; }
      this._userToken = token;
      // Could check on server
      this._isLoggedObs.next(true);
    } catch (e) { console.log(e); }
  }

  private handleUserLogin(body: any): boolean {
    if (!body) { console.error(`No server response.`); return false; }
    const userToken = body.token;
    if (!userToken) { console.error(`No token.`, body); return false; }
    this.setToken(userToken);
    this._userToken = userToken;
    this._isLoggedObs.next(true);
    console.log('User is now logged.');
    return true;
  }

  private getServerAPIAddress(): string {
    return `${this.windowRef.nativeWindow.location.protocol}//${this.windowRef.nativeWindow.location.hostname}:3001/`;
  }

  private getToken(): string {
    return localStorage.getItem(this.userTokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.userTokenKey, token);
  }
}
