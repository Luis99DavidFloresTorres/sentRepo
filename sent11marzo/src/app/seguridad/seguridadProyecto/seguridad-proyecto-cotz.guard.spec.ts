import { TestBed } from '@angular/core/testing';

import { SeguridadProyectoCotzGuard } from './seguridad-proyecto-cotz.guard';

describe('SeguridadProyectoCotzGuard', () => {
  let guard: SeguridadProyectoCotzGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeguridadProyectoCotzGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
