import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeSolicitudDescargoResponsableComponent } from './informe-solicitud-descargo-responsable.component';

describe('InformeSolicitudDescargoResponsableComponent', () => {
  let component: InformeSolicitudDescargoResponsableComponent;
  let fixture: ComponentFixture<InformeSolicitudDescargoResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeSolicitudDescargoResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeSolicitudDescargoResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
