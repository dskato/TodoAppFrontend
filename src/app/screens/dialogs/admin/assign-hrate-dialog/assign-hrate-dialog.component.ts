import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HourlyRate } from 'src/app/interfaces/hourly-rate';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-assign-hrate-dialog',
  templateUrl: './assign-hrate-dialog.component.html',
  styleUrls: ['./assign-hrate-dialog.component.css'],
})
export class AssignHrateDialogComponent implements OnInit {
  assignHR!: FormGroup;
  userData!: any;

  constructor(
    public dialogRef: MatDialogRef<AssignHrateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.userData = data;
    this.assignHR = this.formBuilder.group({
      hrate: [data.hourlyRate || '', [Validators.required]],
    });
  }

  assignHourlyRate() {
    if (this.assignHR.valid) {
      var hrateDto = {} as HourlyRate;
      hrateDto.idUser = this.userData.idUser;
      hrateDto.hourlyRate = this.assignHR.get('hrate')?.value;

      this.adminService.assignHourlyRate(hrateDto).subscribe(
        (response) => {
          if (response.code == 200) {
            const result = { success: true };
            this.dialogRef.close(result);
          } else {
            /* this.toastr.error(response.data, 'Error'); */
          }
        },
        (error) => {}
      );
    } else {
      /* this.toastr.error(this.translateService.instant('hrate-req'), 'Error'); */
    }
  }
  ngOnInit(): void {}

 
}
