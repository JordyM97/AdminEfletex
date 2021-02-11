import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvWebComponent } from './prov-web.component';

describe('ProvWebComponent', () => {
  let component: ProvWebComponent;
  let fixture: ComponentFixture<ProvWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
