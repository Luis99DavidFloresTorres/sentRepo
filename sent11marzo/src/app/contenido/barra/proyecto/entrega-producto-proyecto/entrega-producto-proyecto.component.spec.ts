import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaProductoProyectoComponent } from './entrega-producto-proyecto.component';

describe('EntregaProductoProyectoComponent', () => {
  let component: EntregaProductoProyectoComponent;
  let fixture: ComponentFixture<EntregaProductoProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaProductoProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaProductoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
