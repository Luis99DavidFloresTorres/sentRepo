import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaVentaRecuperarComponent } from './nota-venta-recuperar.component';

describe('NotaVentaRecuperarComponent', () => {
  let component: NotaVentaRecuperarComponent;
  let fixture: ComponentFixture<NotaVentaRecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaVentaRecuperarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaVentaRecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
