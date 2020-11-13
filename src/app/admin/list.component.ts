import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '@app/user/services/user.service';
import { User } from '@app/user/models/user';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  users: any[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }

  deleteUser(id: string) {
    const user = this.users.find((x) => x.id === id);
    user.isDeleting = true;
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.users = this.users.filter((x) => x.id !== id);
      });
  }
}
