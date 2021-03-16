import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesSugerenciasComponent } from './detalles-sugerencias.component';

describe('DetallesSugerenciasComponent', () => {
  let component: DetallesSugerenciasComponent;
  let fixture: ComponentFixture<DetallesSugerenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesSugerenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesSugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
