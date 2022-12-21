import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHerramientasProyectoComponent } from './gestion-herramientas-proyecto.component';

describe('GestionHerramientasProyectoComponent', () => {
  let component: GestionHerramientasProyectoComponent;
  let fixture: ComponentFixture<GestionHerramientasProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionHerramientasProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionHerramientasProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
