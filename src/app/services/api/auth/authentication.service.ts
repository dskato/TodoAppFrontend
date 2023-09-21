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
  private saveUserRes: string = 'System/User/SaveUser';
  private restorePasswordRes: string = 'System/RestorePassword/RestoreUserPassword';
  private verifyCodeRes: string = 'System/RestorePassword/VerifyCode';
  private changePasswordRes: string = 'System/RestorePassword/ChangePassword';

  constructor(private http: HttpClient) {
    this.authApiUrl = environment.AuthApi;
    this.systemApiUrl = environment.SystemApi;
  }

  //Return the token
  login(email: string, password: string): Observable<BaseResponse<string>> {
    const payload = { email, password };
    return this.http.post<BaseResponse<string>>(
      this.authApiUrl + this.loginRes,
      payload
    );
  }

  registerUser(userDto: SaveUser): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.saveUserRes,
      userDto
    );
  }

  restorePassword(email: string): Observable<BaseResponse<string>> {
    const payload = { email };
    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.restorePasswordRes,
      payload
    );
  }

  verifyCode(code: string): Observable<BaseResponse<string>> {
    const payload = { code };
    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.verifyCodeRes,
      payload
    );
  }

  changePassword(code: string, newPassword: string) {
    const payload = { code, newPassword };
    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.changePasswordRes,
      payload
    );
  }
}
