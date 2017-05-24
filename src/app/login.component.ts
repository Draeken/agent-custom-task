import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './core/user.service';

@Component({
  template: '',
  styles: []
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.route.params
      .switchMap(params => this.userService.login(params['token']))
      .subscribe(isLogged => {
        console.log(isLogged);
        if (isLogged) { this.router.navigate(['/']); }
      });
  }
}
