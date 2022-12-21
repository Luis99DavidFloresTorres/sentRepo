import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarNombreFechaDepositoComponent } from './buscar-nombre-fecha-deposito.component';

describe('BuscarNombreFechaDepositoComponent', () => {
  let component: BuscarNombreFechaDepositoComponent;
  let fixture: ComponentFixture<BuscarNombreFechaDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarNombreFechaDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarNombreFechaDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
