import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnvioExitosoComponent } from './modal-envio-exitoso.component';

describe('ModalEnvioExitosoComponent', () => {
  let component: ModalEnvioExitosoComponent;
  let fixture: ComponentFixture<ModalEnvioExitosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEnvioExitosoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEnvioExitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
