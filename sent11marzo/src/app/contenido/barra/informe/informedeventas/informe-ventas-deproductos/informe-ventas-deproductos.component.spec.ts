import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeVentasDeproductosComponent } from './informe-ventas-deproductos.component';

describe('InformeVentasDeproductosComponent', () => {
  let component: InformeVentasDeproductosComponent;
  let fixture: ComponentFixture<InformeVentasDeproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeVentasDeproductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeVentasDeproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
