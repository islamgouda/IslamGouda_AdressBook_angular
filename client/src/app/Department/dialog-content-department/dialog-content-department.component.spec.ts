import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentDepartmentComponent } from './dialog-content-department.component';

describe('DialogContentDepartmentComponent', () => {
  let component: DialogContentDepartmentComponent;
  let fixture: ComponentFixture<DialogContentDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContentDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
