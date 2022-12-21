import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoCotizclienteComponent } from './encabezado-cotizcliente.component';

describe('EncabezadoCotizclienteComponent', () => {
  let component: EncabezadoCotizclienteComponent;
  let fixture: ComponentFixture<EncabezadoCotizclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoCotizclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoCotizclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
