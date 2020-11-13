import { Component } from '@angular/core';

import { UserService } from '@app/user/services/user.service';
import { User } from '@app/user/models/user';
import { Role } from '@app/roles/models/role';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  Role = Role;
  user: User;

  constructor(private userService: UserService) {
    this.userService.user.subscribe((x) => (this.user = x));
  }

  logout() {
    this.userService.logout();
  }
}
