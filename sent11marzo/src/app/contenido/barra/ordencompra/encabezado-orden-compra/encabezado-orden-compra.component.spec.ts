import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoOrdenCompraComponent } from './encabezado-orden-compra.component';

describe('EncabezadoOrdenCompraComponent', () => {
  let component: EncabezadoOrdenCompraComponent;
  let fixture: ComponentFixture<EncabezadoOrdenCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoOrdenCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
