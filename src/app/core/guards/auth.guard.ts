import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  return userService.isLoggedIn.pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      }

      if (state.url === '/') return router.createUrlTree(['/landing']);

      return router.createUrlTree(['/auth/signin']);
    })
  );
};
