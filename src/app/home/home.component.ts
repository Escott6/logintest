import { Component } from '@angular/core';

import { UserService } from '@app/user/services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  user = this.userService.userValue;

  constructor(private userService: UserService) {}
}
