import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { IUserData } from 'src/app/dtos/common/models';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: IUserData = this.authService.getUserStoredData();
    if (user != null && user.isSuccess && user.message) {
      return true;
    }

    // not logged in so redirect to login page wif the return url and return false
    this.router.navigate(['auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
