import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProvComponent } from './registro-prov.component';

describe('RegistroProvComponent', () => {
  let component: RegistroProvComponent;
  let fixture: ComponentFixture<RegistroProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
