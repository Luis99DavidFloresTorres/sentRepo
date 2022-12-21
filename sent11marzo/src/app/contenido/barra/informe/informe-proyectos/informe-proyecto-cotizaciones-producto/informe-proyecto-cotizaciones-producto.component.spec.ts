import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeProyectoCotizacionesProductoComponent } from './informe-proyecto-cotizaciones-producto.component';

describe('InformeProyectoCotizacionesProductoComponent', () => {
  let component: InformeProyectoCotizacionesProductoComponent;
  let fixture: ComponentFixture<InformeProyectoCotizacionesProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeProyectoCotizacionesProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeProyectoCotizacionesProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
