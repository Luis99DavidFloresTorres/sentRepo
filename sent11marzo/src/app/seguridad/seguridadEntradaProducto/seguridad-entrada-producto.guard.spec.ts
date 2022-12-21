import { TestBed } from '@angular/core/testing';

import { SeguridadEntradaProductoGuard } from './seguridad-entrada-producto.guard';

describe('SeguridadEntradaProductoGuard', () => {
  let guard: SeguridadEntradaProductoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeguridadEntradaProductoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
