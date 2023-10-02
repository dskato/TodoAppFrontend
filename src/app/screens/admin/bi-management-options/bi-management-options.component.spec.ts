import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiManagementOptionsComponent } from './bi-management-options.component';

describe('BiManagementOptionsComponent', () => {
  let component: BiManagementOptionsComponent;
  let fixture: ComponentFixture<BiManagementOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiManagementOptionsComponent]
    });
    fixture = TestBed.createComponent(BiManagementOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
