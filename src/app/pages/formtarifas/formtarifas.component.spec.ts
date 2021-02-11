import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtarifasComponent } from './formtarifas.component';

describe('FormtarifasComponent', () => {
  let component: FormtarifasComponent;
  let fixture: ComponentFixture<FormtarifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormtarifasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtarifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
