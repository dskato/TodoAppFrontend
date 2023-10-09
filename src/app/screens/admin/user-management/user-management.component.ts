import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { UserManagement } from 'src/app/interfaces/user-management';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignHrateDialogComponent } from '../../dialogs/admin/assign-hrate-dialog/assign-hrate-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent {
  userEmail!: string;
  userId!: string;
  userList!: UserManagement[];

  constructor(
    private tokenService: TokenService,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
    this.userEmail = tokenService.getUserEmail();
    this.userId = tokenService.getUserId();
    this.getUsersToManagement();
  }

  getUsersToManagement() {
    this.adminService.getUsersToManagement(parseInt(this.userId)).subscribe(
      (response) => {
        if (response.code == 200) {
          this.userList = response.data as unknown as UserManagement[];
          //console.log(this.userList)
        }
      },
      (error) => {}
    );
  }

  assignHourlyRate(userInfo: any) {
    const dialogRef = this.dialog.open(AssignHrateDialogComponent, {
      width: '600px',
      data: userInfo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        this.getUsersToManagement();
      }
    });
  }
}
