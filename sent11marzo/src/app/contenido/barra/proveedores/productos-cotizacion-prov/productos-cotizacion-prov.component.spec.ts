import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCotizacionProvComponent } from './productos-cotizacion-prov.component';

describe('ProductosCotizacionProvComponent', () => {
  let component: ProductosCotizacionProvComponent;
  let fixture: ComponentFixture<ProductosCotizacionProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosCotizacionProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosCotizacionProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
