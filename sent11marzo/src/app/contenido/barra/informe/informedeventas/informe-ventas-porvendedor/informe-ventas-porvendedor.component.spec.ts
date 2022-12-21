import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeVentasPorvendedorComponent } from './informe-ventas-porvendedor.component';

describe('InformeVentasPorvendedorComponent', () => {
  let component: InformeVentasPorvendedorComponent;
  let fixture: ComponentFixture<InformeVentasPorvendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeVentasPorvendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeVentasPorvendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
