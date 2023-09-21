import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserToken } from 'src/app/interfaces/user-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey: string = 'token';

  constructor(private router: Router) {}

  getToken(): string {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null ? token : '';
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    var isValid = false;

    if (!token) {
      return isValid;
    }

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp;
      const currentTime = new Date().getTime();
      if (currentTime >= expirationTime) {
        isValid = true;
      } else {
        isValid = false;
      }
    }
    return isValid;
  }

  redirectIfNotValid(page: string): void {
    if (!this.isTokenValid()) {
      this.removeToken();
      this.router.navigate([page]);
    }
  }

  redirectIfValid(page: string): void {
    if (this.isTokenValid()) {
      this.router.navigate([page]);
    }
  }

  getUserRole(): string {
    return jwtDecode<UserToken>(this.getToken()).Role;
  }
  getUserId(): string {
    return jwtDecode<UserToken>(this.getToken()).Id;
  }
  getUserEmail(): string {
    return jwtDecode<UserToken>(this.getToken()).email;
  }
}
