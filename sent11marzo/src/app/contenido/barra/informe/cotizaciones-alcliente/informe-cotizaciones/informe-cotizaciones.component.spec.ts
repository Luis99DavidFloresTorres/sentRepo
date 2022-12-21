import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeCotizacionesComponent } from './informe-cotizaciones.component';

describe('InformeCotizacionesComponent', () => {
  let component: InformeCotizacionesComponent;
  let fixture: ComponentFixture<InformeCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeCotizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
