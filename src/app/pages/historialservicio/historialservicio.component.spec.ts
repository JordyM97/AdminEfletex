import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialservicioComponent } from './historialservicio.component';

describe('HistorialservicioComponent', () => {
  let component: HistorialservicioComponent;
  let fixture: ComponentFixture<HistorialservicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialservicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
