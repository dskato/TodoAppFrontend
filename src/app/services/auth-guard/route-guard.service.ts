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

  logOut() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  redirectBasedOnRole(): void {
    var token = this.tokenService.getToken();
    if (token == '') {
      return;
    }
    
    const role = this.tokenService.getUserRole();
    if (role == 'ADMIN' || role == 'SUPERADMIN') {
      this.router.navigate(['/admin-panel']);
    } else if (role == 'USER') {
      this.router.navigate(['/check-in']);
    }
  }
}
