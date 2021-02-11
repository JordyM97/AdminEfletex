import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeditservicioComponent } from './formeditservicio.component';

describe('FormeditservicioComponent', () => {
  let component: FormeditservicioComponent;
  let fixture: ComponentFixture<FormeditservicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormeditservicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeditservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
