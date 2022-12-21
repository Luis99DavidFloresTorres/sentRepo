import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeSolicitudPresupuestoResponsableComponent } from './informe-solicitud-presupuesto-responsable.component';

describe('InformeSolicitudPresupuestoResponsableComponent', () => {
  let component: InformeSolicitudPresupuestoResponsableComponent;
  let fixture: ComponentFixture<InformeSolicitudPresupuestoResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeSolicitudPresupuestoResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeSolicitudPresupuestoResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
