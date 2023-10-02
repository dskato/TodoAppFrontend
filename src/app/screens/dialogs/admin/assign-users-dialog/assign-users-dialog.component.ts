import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-assign-users-dialog',
  templateUrl: './assign-users-dialog.component.html',
  styleUrls: ['./assign-users-dialog.component.css']
})
export class AssignUsersDialogComponent  implements OnInit {

  constructor(public dialogRef: MatDialogRef<AssignUsersDialogComponent>) { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }


}
