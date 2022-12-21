import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPresupuestoProyectoComponent } from './solicitud-presupuesto-proyecto.component';

describe('SolicitudPresupuestoProyectoComponent', () => {
  let component: SolicitudPresupuestoProyectoComponent;
  let fixture: ComponentFixture<SolicitudPresupuestoProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudPresupuestoProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPresupuestoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
