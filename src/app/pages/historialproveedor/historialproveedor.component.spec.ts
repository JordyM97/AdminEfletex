import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialproveedorComponent } from './historialproveedor.component';

describe('HistorialproveedorComponent', () => {
  let component: HistorialproveedorComponent;
  let fixture: ComponentFixture<HistorialproveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialproveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
