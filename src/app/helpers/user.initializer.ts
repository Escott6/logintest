import { UserService } from '@app/user/services/user.service';

// attempts to authenticate user if the token stored in the browser still exists
export function appInitializer(userService: UserService) {
  return () =>
    new Promise((resolve) => {
      userService.refreshToken().subscribe().add(resolve);
    });
}
