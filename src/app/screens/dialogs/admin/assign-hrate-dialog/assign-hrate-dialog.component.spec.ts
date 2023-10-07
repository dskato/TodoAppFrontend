import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHrateDialogComponent } from './assign-hrate-dialog.component';

describe('AssignHrateDialogComponent', () => {
  let component: AssignHrateDialogComponent;
  let fixture: ComponentFixture<AssignHrateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignHrateDialogComponent]
    });
    fixture = TestBed.createComponent(AssignHrateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
