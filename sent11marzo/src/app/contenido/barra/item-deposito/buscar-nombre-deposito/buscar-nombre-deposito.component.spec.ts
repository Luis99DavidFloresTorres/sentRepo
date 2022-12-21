import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarNombreDepositoComponent } from './buscar-nombre-deposito.component';

describe('BuscarNombreDepositoComponent', () => {
  let component: BuscarNombreDepositoComponent;
  let fixture: ComponentFixture<BuscarNombreDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarNombreDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarNombreDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
