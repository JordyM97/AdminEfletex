import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuproveedorComponent } from './menuproveedor.component';

describe('MenuproveedorComponent', () => {
  let component: MenuproveedorComponent;
  let fixture: ComponentFixture<MenuproveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuproveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
