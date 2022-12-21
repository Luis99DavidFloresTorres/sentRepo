import { TestBed } from '@angular/core/testing';

import { NotaventaGuardGuard } from './notaventa-guard.guard';

describe('NotaventaGuardGuard', () => {
  let guard: NotaventaGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotaventaGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
