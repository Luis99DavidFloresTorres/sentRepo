import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCotizacionRecuperarComponent } from './nota-cotizacion-recuperar.component';

describe('NotaCotizacionRecuperarComponent', () => {
  let component: NotaCotizacionRecuperarComponent;
  let fixture: ComponentFixture<NotaCotizacionRecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaCotizacionRecuperarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaCotizacionRecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
