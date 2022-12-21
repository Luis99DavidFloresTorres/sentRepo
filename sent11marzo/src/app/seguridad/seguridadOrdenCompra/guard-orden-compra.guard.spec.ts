import { TestBed } from '@angular/core/testing';

import { GuardOrdenCompraGuard } from './guard-orden-compra.guard';

describe('GuardOrdenCompraGuard', () => {
  let guard: GuardOrdenCompraGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardOrdenCompraGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
