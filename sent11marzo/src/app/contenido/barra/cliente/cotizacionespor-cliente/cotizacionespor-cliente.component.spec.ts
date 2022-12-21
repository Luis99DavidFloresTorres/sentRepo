import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesporClienteComponent } from './cotizacionespor-cliente.component';

describe('CotizacionesporClienteComponent', () => {
  let component: CotizacionesporClienteComponent;
  let fixture: ComponentFixture<CotizacionesporClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionesporClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionesporClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
