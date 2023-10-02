import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUsersDialogComponent } from './assign-users-dialog.component';

describe('AssignUsersDialogComponent', () => {
  let component: AssignUsersDialogComponent;
  let fixture: ComponentFixture<AssignUsersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignUsersDialogComponent]
    });
    fixture = TestBed.createComponent(AssignUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
