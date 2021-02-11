import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialclienteComponent } from './historialcliente.component';

describe('HistorialclienteComponent', () => {
  let component: HistorialclienteComponent;
  let fixture: ComponentFixture<HistorialclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
