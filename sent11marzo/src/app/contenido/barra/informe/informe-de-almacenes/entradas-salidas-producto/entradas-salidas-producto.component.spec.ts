import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasSalidasProductoComponent } from './entradas-salidas-producto.component';

describe('EntradasSalidasProductoComponent', () => {
  let component: EntradasSalidasProductoComponent;
  let fixture: ComponentFixture<EntradasSalidasProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradasSalidasProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasSalidasProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
