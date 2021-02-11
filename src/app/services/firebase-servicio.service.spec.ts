import { TestBed } from '@angular/core/testing';

import { FirebaseServicioService } from './firebase-servicio.service';

describe('FirebaseServicioService', () => {
  let service: FirebaseServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
