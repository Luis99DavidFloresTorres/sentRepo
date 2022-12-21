import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoDocumentoComponent } from './encabezado-documento.component';

describe('EncabezadoDocumentoComponent', () => {
  let component: EncabezadoDocumentoComponent;
  let fixture: ComponentFixture<EncabezadoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
