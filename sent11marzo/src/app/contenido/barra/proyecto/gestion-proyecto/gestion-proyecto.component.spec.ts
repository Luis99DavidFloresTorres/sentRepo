import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProyectoComponent } from './gestion-proyecto.component';

describe('GestionProyectoComponent', () => {
  let component: GestionProyectoComponent;
  let fixture: ComponentFixture<GestionProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
