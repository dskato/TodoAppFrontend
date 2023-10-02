import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/base-response';
import { environment } from 'src/environments/environment.development';
import { TokenService } from '../../token/token.service';
import { SaveBusiness } from 'src/app/interfaces/save-business';
import { AssignUser } from 'src/app/interfaces/assign-user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  //URL
  private authApiUrl!: string;
  private systemApiUrl!: string;
  //Resources
  private getAssignableUsersRes: string =
    'System/User/GetUsersAssignableToBusiness';
  private saveBusinessRes: string = 'System/Business/SaveBusiness';
  private assignUserToBusinessRes: string =
    'System/Business/AssignUserToBusiness';
  private makeUserRepresentativeRes: string =
    'System/Business/MakeUserBusinessRepresentative';
  private getAllBusinessRes: string = 'System/Business/GetAllBusiness';
  private getAllBusinessByIdUserRes: string =
    'System/Business/GetAllBusinessByUserAndRole/';

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authApiUrl = environment.AuthApi;
    this.systemApiUrl = environment.SystemApi;
  }

  getAssignableUsers(): Observable<BaseResponse<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.get<BaseResponse<string>>(
      this.systemApiUrl + this.getAssignableUsersRes,
      options
    );
  }

  saveBusiness(businessDto: SaveBusiness): Observable<BaseResponse<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.saveBusinessRes,
      businessDto,
      options
    );
  }

  makeUserRepresentative(
    assignUserDto: AssignUser
  ): Observable<BaseResponse<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.makeUserRepresentativeRes,
      assignUserDto,
      options
    );
  }

  assignUserToBusiness(
    assignUserDto: AssignUser
  ): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.assignUserToBusinessRes,
      assignUserDto
    );
  }

  getAllBusiness(): Observable<BaseResponse<string>> {
    return this.http.get<BaseResponse<string>>(
      this.systemApiUrl + this.getAllBusinessRes
    );
  }

  getAllBusinessByUser(idUser: number): Observable<BaseResponse<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.get<BaseResponse<string>>(
      this.systemApiUrl + this.getAllBusinessByIdUserRes + idUser,
      options
    );
  }
}
