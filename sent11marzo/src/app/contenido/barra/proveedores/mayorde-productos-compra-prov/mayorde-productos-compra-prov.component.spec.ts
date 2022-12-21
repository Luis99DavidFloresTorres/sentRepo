import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayordeProductosCompraProvComponent } from './mayorde-productos-compra-prov.component';

describe('MayordeProductosCompraProvComponent', () => {
  let component: MayordeProductosCompraProvComponent;
  let fixture: ComponentFixture<MayordeProductosCompraProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayordeProductosCompraProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MayordeProductosCompraProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
