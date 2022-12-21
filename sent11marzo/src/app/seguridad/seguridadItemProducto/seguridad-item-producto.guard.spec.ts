import { TestBed } from '@angular/core/testing';

import { SeguridadItemProductoGuard } from './seguridad-item-producto.guard';

describe('SeguridadItemProductoGuard', () => {
  let guard: SeguridadItemProductoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeguridadItemProductoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
