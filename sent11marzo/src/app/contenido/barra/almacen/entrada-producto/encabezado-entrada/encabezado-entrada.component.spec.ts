import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoEntradaComponent } from './encabezado-entrada.component';

describe('EncabezadoEntradaComponent', () => {
  let component: EncabezadoEntradaComponent;
  let fixture: ComponentFixture<EncabezadoEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
