import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoProyectosComponent } from './estado-proyectos.component';

describe('EstadoProyectosComponent', () => {
  let component: EstadoProyectosComponent;
  let fixture: ComponentFixture<EstadoProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
