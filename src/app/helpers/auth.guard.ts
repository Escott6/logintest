import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { UserService } from '@app/user/services/user.service';

// Prevents users who are not authenticated from viewing certain pages
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.userService.userValue;
    if (user) {
      if (route.data.roles && !route.data.roles.includes(user.role)) {
        // user can't go here doesn't have correct role redirect to home
        this.router.navigate(['/']);
        return false;
      }
      // They're authorized to go here -> return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/user/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
