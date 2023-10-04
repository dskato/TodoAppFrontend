import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { UserDto } from 'src/app/interfaces/user-dto';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AssignUser } from 'src/app/interfaces/assign-user';
import { ToastrService } from 'ngx-toastr';
import { RoleDto } from 'src/app/interfaces/role-dto';

@Component({
  selector: 'app-assign-users-dialog',
  templateUrl: './assign-users-dialog.component.html',
  styleUrls: ['./assign-users-dialog.component.css'],
})
export class AssignUsersDialogComponent implements OnInit {
  currentBusiness!: any;
  //Lists
  userList!: UserDto[];
  assignedUserLs!: UserDto[];
  roleList: RoleDto[] = [
    { idRole: 1, name: 'USER' },
    { idRole: 2, name: 'ADMIN' },
  ];
  //Selected items
  selectedUser!: any;
  //--visibility and states
  dsblRepInpt = false;
  vvLabelNoUsersAssigned = false;
  vvSaveUserBtn = false;
  //Inputs
  @ViewChild('susrTypeahead') susrTypeahead!: ElementRef;
  //Placeholder
  sUserPh = '';

  constructor(
    public dialogRef: MatDialogRef<AssignUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private translateService: TranslateService,
    private toastr: ToastrService
  ) {
    this.currentBusiness = data;
    this.getAssignableUsers();
    this.getAssignedUsers(this.currentBusiness.idBusiness);
    this.sUserPh = this.translateService.instant('assignusr-ph');
  }

  onUserSelected(selectedItem: NgbTypeaheadSelectItemEvent<any>) {
    //Search for the user in the list
    this.selectedUser = this.userList.find(
      (user) =>
        user.email + ' - ' + user.firstName + ' ' + user.lastName ===
        selectedItem.item
    );
    this.dsblRepInpt = true;
    this.vvSaveUserBtn = true;
  }

  clearSelectedUser() {
    this.selectedUser = null;
    if (this.susrTypeahead) {
      this.susrTypeahead.nativeElement.value = '';
    }
    this.dsblRepInpt = false;
    this.vvSaveUserBtn = false;
  }

  assignUserToBusiness() {
    var assignUserDto = {} as AssignUser;
    assignUserDto.idUser = this.selectedUser.idUser;
    assignUserDto.idBusiness = parseInt(this.currentBusiness.idBusiness);
    assignUserDto.isRepresentative = false;
    this.adminService.assignUserToBusiness(assignUserDto).subscribe(
      (response) => {
        if (response.code == 200) {
          this.toastr.success(
            this.translateService.instant('assignusr-ok'),
            'Ok'
          );
          //Call again the list and clear
          this.getAssignedUsers(this.currentBusiness.idBusiness);
          this.clearSelectedUser();
        } else {
          this.toastr.error(response.data, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  unassignUserToBusiness(idUser: number) {
    var assignUserDto = {} as AssignUser;
    assignUserDto.idUser = idUser;
    assignUserDto.idBusiness = parseInt(this.currentBusiness.idBusiness);
    this.adminService.unassignUserToBusiness(assignUserDto).subscribe(
      (response) => {
        if (response.code == 200) {
          this.toastr.success(
            this.translateService.instant('unassignusr-ok'),
            'Ok'
          );
          //Call again the list and clear
          this.getAssignedUsers(this.currentBusiness.idBusiness);
        } else {
          this.toastr.error(response.data, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUserRole(idUser: number, idSelectedRole: number) {
    this.adminService.updateUserRoles(idUser, idSelectedRole).subscribe(
      (response) => {
        console.log(response);
        if (response.code == 200) {
          if (response.data == 'Ok') {
            this.toastr.success(
              this.translateService.instant('assignusr-ls-rolechg'),
              'Ok'
            );
          }
        } else {
          this.toastr.error(response.data, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  //--------------------------------------------------------------------------------------------------------

  private getAssignedUsers(idBusiness: number) {
    this.adminService.getUsersAssignedToBusiness(idBusiness).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.data.length == 0) {
            this.vvLabelNoUsersAssigned = true;
          } else {
            this.vvLabelNoUsersAssigned = false;
            if (Array.isArray(response.data)) {
              this.assignedUserLs = response.data.map((user: any) => {
                const simplifiedRole: RoleDto = {
                  idRole: user.roleEntity.idRole,
                  name: user.roleEntity.name,
                };

                return {
                  idUser: user.idUser,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  roleEntity: simplifiedRole,
                } as UserDto;
              });
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getAssignableUsers() {
    this.adminService.getAssignableUsers().subscribe(
      (response) => {
        this.userList = response.data as unknown as UserDto[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.userList
              .filter(
                (v) =>
                  v.email.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                  v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .map(
                (user) =>
                  user.email + ' - ' + user.firstName + ' ' + user.lastName
              )
              .slice(0, 10)
      )
    );

  formatter = (result: string) => result;
}
