import { TestBed } from '@angular/core/testing';

import { SalidaProductoGuard } from './salida-producto.guard';

describe('SalidaProductoGuard', () => {
  let guard: SalidaProductoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalidaProductoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
