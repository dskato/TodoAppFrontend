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
    if(this.isJWT(token)){
      localStorage.setItem(this.tokenKey, token);
    }
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    let isValid = false;

    if (!token) {
      return isValid;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
    const currentTime = new Date().getTime();

    if (currentTime < expirationTime) {
      isValid = true;
    } else {
      isValid = false;
      this.removeToken()
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
    return jwtDecode<UserToken>(this.getToken()).role;
  }
  getUserId(): string {
    return jwtDecode<UserToken>(this.getToken()).Id;
  }
  getUserEmail(): string {
    return jwtDecode<UserToken>(this.getToken()).email;
  }

  isJWT(token: string): boolean {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }
    const [header, payload, signature] = parts;
    if (!header || !payload || !signature) {
      return false; 
    }

    return true; 
  }
}
