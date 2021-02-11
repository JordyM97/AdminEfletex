import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormedittarifaComponent } from './formedittarifa.component';

describe('FormedittarifaComponent', () => {
  let component: FormedittarifaComponent;
  let fixture: ComponentFixture<FormedittarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormedittarifaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormedittarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
