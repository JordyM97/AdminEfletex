import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesComentariosComponent } from './detalles-comentarios.component';

describe('DetallesComentariosComponent', () => {
  let component: DetallesComentariosComponent;
  let fixture: ComponentFixture<DetallesComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesComentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
