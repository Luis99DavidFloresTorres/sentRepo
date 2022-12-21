import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirProyectoComponent } from './imprimir-proyecto.component';

describe('ImprimirProyectoComponent', () => {
  let component: ImprimirProyectoComponent;
  let fixture: ComponentFixture<ImprimirProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
