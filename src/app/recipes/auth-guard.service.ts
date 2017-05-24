import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';

import { UserService } from '../core/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isLogged) { return true; }
    return false;
  }

}
