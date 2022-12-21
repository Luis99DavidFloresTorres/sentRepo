import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesPorvendedorComponent } from './cotizaciones-porvendedor.component';

describe('CotizacionesPorvendedorComponent', () => {
  let component: CotizacionesPorvendedorComponent;
  let fixture: ComponentFixture<CotizacionesPorvendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionesPorvendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionesPorvendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
