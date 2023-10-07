import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/base-response';
import { environment } from 'src/environments/environment.development';
import { TokenService } from '../../token/token.service';
import { SaveBusiness } from 'src/app/interfaces/save-business';
import { AssignUser } from 'src/app/interfaces/assign-user';
import { HourlyRate } from 'src/app/interfaces/hourly-rate';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  //URL
  private authApiUrl!: string;
  private systemApiUrl!: string;

  //Resources
  ////////////////////////////////////////////////////////////////////////////////////////
  //// User
  private getAssignableUsersRes: string =
    'System/User/GetUsersAssignableToBusiness';
  private getAssignedUsersRes: string = 'System/User/GetAssignedUsers/';
  private updateUserRoleRes: string = 'System/User/UpdateUserRole/';
  private getUsersToManagementRes: string = 'System/User/GetAllUsersToManagement/';
  private assignHourlyRateRes: string = 'System/User/AssignHourlyRate';

  //// Business
  private saveBusinessRes: string = 'System/Business/SaveBusiness';
  private updateBusinessRes: string = 'System/Business/UpdateBusiness';
  private assignUserToBusinessRes: string =
    'System/Business/AssignUserToBusiness';
  private unassignUserToBusinessRes: string =
    'System/Business/UnassignUserToBusiness';
  private makeUserRepresentativeRes: string =
    'System/Business/MakeUserBusinessRepresentative';
  private getAllBusinessRes: string = 'System/Business/GetAllBusiness';
  private getAllBusinessByIdUserRes: string =
    'System/Business/GetAllBusinessByUserAndRole/';
  ////////////////////////////////////////////////////////////////////////////////////////

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authApiUrl = environment.AuthApi;
    this.systemApiUrl = environment.SystemApi;
  }

  // USER API
  ////////////////////////////////////////////////////////////////////////////////////////
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

  getUsersAssignedToBusiness(idBusiness: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.get<BaseResponse<string>>(
      this.systemApiUrl + this.getAssignedUsersRes + idBusiness,
      options
    );
  }

  updateUserRoles(
    idUser: number,
    idRole: number
  ): Observable<BaseResponse<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.get<BaseResponse<string>>(
      this.systemApiUrl + this.updateUserRoleRes + idUser + '/' + idRole,
      options
    );
  }

  getUsersToManagement(
    idUser: number
  ): Observable<BaseResponse<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.get<BaseResponse<string>>(
      this.systemApiUrl + this.getUsersToManagementRes + idUser ,
      options
    );
  }

  assignHourlyRate(hrate: HourlyRate): Observable<BaseResponse<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.assignHourlyRateRes,
      hrate,
      options
    );
  }

  // BUSINESS API
  ////////////////////////////////////////////////////////////////////////////////////////

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

  updateBusiness(businessDto: SaveBusiness): Observable<BaseResponse<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.updateBusinessRes,
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

  unassignUserToBusiness(
    assignUserDto: AssignUser
  ): Observable<BaseResponse<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const options = { headers: headers };

    return this.http.post<BaseResponse<string>>(
      this.systemApiUrl + this.unassignUserToBusinessRes,
      assignUserDto,
      options
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
