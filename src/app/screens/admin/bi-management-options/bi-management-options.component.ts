import { Component } from '@angular/core';
import { SaveBusiness } from 'src/app/interfaces/save-business';
import { TokenService } from 'src/app/services/token/token.service';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { EditBusinessDialogComponent } from '../../dialogs/admin/edit-business-dialog/edit-business-dialog.component';
import { AssignUsersDialogComponent } from '../../dialogs/admin/assign-users-dialog/assign-users-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bi-management-options',
  templateUrl: './bi-management-options.component.html',
  styleUrls: ['./bi-management-options.component.css'],
})
export class BiManagementOptionsComponent {
  businessList!: SaveBusiness[];

  constructor(
    private tokenService: TokenService,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
    this.fillBusinessList();
  }

  fillBusinessList() {
    this.adminService
      .getAllBusinessByUser(parseInt(this.tokenService.getUserId()))
      .subscribe(
        (response) => {
          this.businessList = response.data as unknown as SaveBusiness[];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  editBusiness(business: any) {
    const dialogRef = this.dialog.open(EditBusinessDialogComponent, {
      width: '600px',
      data: business,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fillBusinessList();
    });
  }

  assignUserToBusiness(business: any) {

    const dialogRef = this.dialog.open(AssignUsersDialogComponent, {
      width: '700px',
      data: business,
    });
    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }

}
