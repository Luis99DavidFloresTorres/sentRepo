import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeCotizacionesProveedorComponent } from './informe-cotizaciones-proveedor.component';

describe('InformeCotizacionesProveedorComponent', () => {
  let component: InformeCotizacionesProveedorComponent;
  let fixture: ComponentFixture<InformeCotizacionesProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeCotizacionesProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeCotizacionesProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
