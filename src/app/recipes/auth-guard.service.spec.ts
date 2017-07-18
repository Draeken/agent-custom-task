import { AuthGuardService } from './auth-guard.service';
import { UserService } from '../core/user.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  it('should pass logged users', () => {
    const us = { isLogged: true } as UserService;
    service = new AuthGuardService(us, null);
    expect(service.canActivate(null, null)).toBeTruthy();
  });

  it('should block anonym users', () => {
    const us = { isLogged: false } as UserService;
    service = new AuthGuardService(us, null);
    expect(service.canActivate(null, null)).toBeFalsy();
  });
});
