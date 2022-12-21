import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarDescargoGastoComponent } from './buscar-descargo-gasto.component';

describe('BuscarDescargoGastoComponent', () => {
  let component: BuscarDescargoGastoComponent;
  let fixture: ComponentFixture<BuscarDescargoGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarDescargoGastoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarDescargoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
