import { Component } from '@angular/core';
import { SaveBusiness } from 'src/app/interfaces/save-business';
import { TokenService } from 'src/app/services/token/token.service';
import { AdminService } from 'src/app/services/api/admin/admin.service';

@Component({
  selector: 'app-bi-management-options',
  templateUrl: './bi-management-options.component.html',
  styleUrls: ['./bi-management-options.component.css'],
})
export class BiManagementOptionsComponent {
  businessList!: SaveBusiness[];

  constructor(
    private tokenService: TokenService,
    private adminService: AdminService
  ) {
    adminService
      .getAllBusinessByUser(parseInt(tokenService.getUserId()))
      .subscribe(
        (response) => {
          this.businessList = response.data as unknown as SaveBusiness[];
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
}
