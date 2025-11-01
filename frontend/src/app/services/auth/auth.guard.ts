import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  // console.log(auth.user());
  const router = inject(Router);
  // console.log(auth.user());
  // return auth.user() ? true : router.createUrlTree(['/login']);
    const user = await auth.getCurrentUser();
    console.log(user);

  return user ? true : router.createUrlTree(['/login']);
}

export const guestGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
    const user = await auth.getCurrentUser();
    console.log(user);

  return user ? router.createUrlTree(['/']) : true;
}

export const adminGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
    const user = await auth.getCurrentUser();
    console.log(user);

  return (user as any).role === 'admin' ?  true: false;
}
