import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entre2fechasDepositoComponent } from './entre2fechas-deposito.component';

describe('Entre2fechasDepositoComponent', () => {
  let component: Entre2fechasDepositoComponent;
  let fixture: ComponentFixture<Entre2fechasDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Entre2fechasDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Entre2fechasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
