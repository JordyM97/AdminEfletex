import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesPreregistroComponent } from './modal-detalles-preregistro.component';

describe('ModalDetallesPreregistroComponent', () => {
  let component: ModalDetallesPreregistroComponent;
  let fixture: ComponentFixture<ModalDetallesPreregistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetallesPreregistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesPreregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
