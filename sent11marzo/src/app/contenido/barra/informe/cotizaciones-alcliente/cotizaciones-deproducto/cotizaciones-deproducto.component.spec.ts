import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesDeproductoComponent } from './cotizaciones-deproducto.component';

describe('CotizacionesDeproductoComponent', () => {
  let component: CotizacionesDeproductoComponent;
  let fixture: ComponentFixture<CotizacionesDeproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionesDeproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionesDeproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
