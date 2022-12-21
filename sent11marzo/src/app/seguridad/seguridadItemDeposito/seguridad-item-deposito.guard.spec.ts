import { TestBed } from '@angular/core/testing';

import { SeguridadItemDepositoGuard } from './seguridad-item-deposito.guard';

describe('SeguridadItemDepositoGuard', () => {
  let guard: SeguridadItemDepositoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeguridadItemDepositoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
