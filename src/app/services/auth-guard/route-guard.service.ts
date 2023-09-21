import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.tokenService.getUserRole();
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
   
  }

  redirectBasedOnRole() {
    const role = this.tokenService.getUserRole();
    if (role == 'ADMIN' || role == 'SUPERADMIN') {
      this.tokenService.redirectIfValid('/admin-panel');
    } else if (role == 'USER  ') {
      this.tokenService.redirectIfValid('/check-in');
    }
  }
}
