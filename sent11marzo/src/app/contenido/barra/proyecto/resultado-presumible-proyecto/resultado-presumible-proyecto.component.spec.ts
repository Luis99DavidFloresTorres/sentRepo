import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoPresumibleProyectoComponent } from './resultado-presumible-proyecto.component';

describe('ResultadoPresumibleProyectoComponent', () => {
  let component: ResultadoPresumibleProyectoComponent;
  let fixture: ComponentFixture<ResultadoPresumibleProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoPresumibleProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoPresumibleProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
