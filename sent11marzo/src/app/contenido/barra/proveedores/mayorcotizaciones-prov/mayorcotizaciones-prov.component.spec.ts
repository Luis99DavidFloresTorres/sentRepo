import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorcotizacionesProvComponent } from './mayorcotizaciones-prov.component';

describe('MayorcotizacionesProvComponent', () => {
  let component: MayorcotizacionesProvComponent;
  let fixture: ComponentFixture<MayorcotizacionesProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayorcotizacionesProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MayorcotizacionesProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
