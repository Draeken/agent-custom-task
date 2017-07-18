import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { WindowRef } from '../core/window.provider';


describe('UserService', () => {
  let service: UserService;
  const testToken = 'test-token';
  const lsToken = 'local-token';
  const http: Http = new Http(null, new RequestOptions({}));
  let httpSpy: jasmine.Spy;
  let lsSpyGet: jasmine.Spy;
  let lsSpySet: jasmine.Spy;
  let lsTokenSpy: string;

  beforeEach(() => {
    lsTokenSpy = undefined;
    httpSpy = spyOn(http, 'post').and.returnValue(Observable.of({
      json: () => ({
        token: testToken
      })
    }));
    lsSpyGet = spyOn(localStorage, 'getItem').and.returnValue(lsToken);
    lsSpySet = spyOn(localStorage, 'setItem').and.callFake((key, item) => lsTokenSpy = item);
  })

  it('should have loggin status when token is present', () => {
    service = new UserService(new WindowRef(), http);

    expect(service.isLogged).toBeTruthy('status was correctly set');
    expect(lsSpyGet.calls.count()).toBe(1);
    expect(lsSpySet.calls.count()).toBe(0);
    expect(httpSpy.calls.count()).toBe(0);
  });

  it('should have not loggin status when token is missing', () => {
    lsSpyGet.and.returnValue(undefined);
    service = new UserService(new WindowRef(), http);

    expect(service.isLogged).toBeFalsy('status was correctly set');
    expect(lsSpyGet.calls.count()).toBe(1);
    expect(lsSpySet.calls.count()).toBe(0);
    expect(httpSpy.calls.count()).toBe(0);
  });

  it('should log in the user', () => {
    lsSpyGet.and.returnValue(undefined);
    service = new UserService(new WindowRef(), http);
    service.login('temp').subscribe(success => {
      expect(httpSpy.calls.count()).toBe(1);
      expect(success).toBeTruthy('successfully log in');
      expect(service.isLogged).toBeTruthy('correctly set login status')
      expect(lsTokenSpy).toMatch(testToken);
    })
  })
});
