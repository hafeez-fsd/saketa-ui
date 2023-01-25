import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditEmployeeComponent } from './adit-employee.component';

describe('AditEmployeeComponent', () => {
  let component: AditEmployeeComponent;
  let fixture: ComponentFixture<AditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AditEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
