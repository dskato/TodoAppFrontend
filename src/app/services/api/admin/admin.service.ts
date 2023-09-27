import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/base-response';
import { environment } from 'src/environments/environment.development';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //URL
  private authApiUrl!: string;
  private systemApiUrl!: string;
  //Resources
  private getAssignableUsersRes: string = 'System/User/GetUsersAssignableToBusiness';


  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authApiUrl = environment.AuthApi;
    this.systemApiUrl = environment.SystemApi;
  }

  getAssignableUsers(): Observable<BaseResponse<string>> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`, 
    });
    const options = { headers: headers };

    return this.http.get<BaseResponse<string>>(
      this.systemApiUrl + this.getAssignableUsersRes,
      options
    );
  }

}
