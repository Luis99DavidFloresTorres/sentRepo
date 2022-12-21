import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeSolicitudPresupuestoComponent } from './informe-solicitud-presupuesto.component';

describe('InformeSolicitudPresupuestoComponent', () => {
  let component: InformeSolicitudPresupuestoComponent;
  let fixture: ComponentFixture<InformeSolicitudPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeSolicitudPresupuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeSolicitudPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
