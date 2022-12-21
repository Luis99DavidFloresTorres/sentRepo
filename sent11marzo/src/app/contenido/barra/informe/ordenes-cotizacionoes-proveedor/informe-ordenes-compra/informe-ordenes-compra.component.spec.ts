import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeOrdenesCompraComponent } from './informe-ordenes-compra.component';

describe('InformeOrdenesCompraComponent', () => {
  let component: InformeOrdenesCompraComponent;
  let fixture: ComponentFixture<InformeOrdenesCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeOrdenesCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeOrdenesCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
