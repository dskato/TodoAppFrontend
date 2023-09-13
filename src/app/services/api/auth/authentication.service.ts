import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/base-response';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //URL
  private authApiUrl!: string;
  //Resource
  private loginRes: string = 'Auth/Login';

  constructor(private http: HttpClient) {
    this.authApiUrl = environment.AuthApi;
  }

  //Return the token
  login(username: string, password: string): Observable<BaseResponse<string>> {
    const loginData = { username, password };
    return this.http.post<BaseResponse<string>>(
      this.authApiUrl + this.loginRes,
      loginData
    );
  }
}
