import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoOrdenCompraProvComponent } from './producto-orden-compra-prov.component';

describe('ProductoOrdenCompraProvComponent', () => {
  let component: ProductoOrdenCompraProvComponent;
  let fixture: ComponentFixture<ProductoOrdenCompraProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoOrdenCompraProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoOrdenCompraProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
