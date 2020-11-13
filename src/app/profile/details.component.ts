import { Component } from '@angular/core';

import { UserService } from '@app/user/services/user.service';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent {
  user = this.userService.userValue;

  constructor(private userService: UserService) {}
}
