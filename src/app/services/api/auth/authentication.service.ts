import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/base-response';
import { environment } from 'src/environments/environment.development';
import { SaveUser } from 'src/app/interfaces/save-user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //URL
  private authApiUrl!: string;
  private systemApiUrl!: string;
  //Resources
  private loginRes: string = 'Auth/Login';
  private saveUserRes:string = 'System/User/SaveUser';

  constructor(private http: HttpClient) {
    this.authApiUrl = environment.AuthApi;
    this.systemApiUrl = environment.SystemApi;
  }

  //Return the token
  login(email: string, password: string): Observable<BaseResponse<string>> {
    const loginData = { email, password };
    return this.http.post<BaseResponse<string>>(
      this.authApiUrl + this.loginRes,
      loginData
    );
  }

  registerUser(userDto: SaveUser):  Observable<BaseResponse<string>>{
    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.saveUserRes,
      userDto
    );
  }

}
