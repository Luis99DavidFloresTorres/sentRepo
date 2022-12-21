import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayordeOrdencompras2Component } from './mayorde-ordencompras2.component';

describe('MayordeOrdencompras2Component', () => {
  let component: MayordeOrdencompras2Component;
  let fixture: ComponentFixture<MayordeOrdencompras2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayordeOrdencompras2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MayordeOrdencompras2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
