import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolProyectosComponent } from './arbol-proyectos.component';

describe('ArbolProyectosComponent', () => {
  let component: ArbolProyectosComponent;
  let fixture: ComponentFixture<ArbolProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
