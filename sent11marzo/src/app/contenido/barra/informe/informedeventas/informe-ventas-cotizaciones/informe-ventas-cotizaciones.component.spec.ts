import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeVentasCotizacionesComponent } from './informe-ventas-cotizaciones.component';

describe('InformeVentasCotizacionesComponent', () => {
  let component: InformeVentasCotizacionesComponent;
  let fixture: ComponentFixture<InformeVentasCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeVentasCotizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeVentasCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
