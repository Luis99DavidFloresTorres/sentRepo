import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaProductoPorFechaComponent } from './entrega-producto-por-fecha.component';

describe('EntregaProductoPorFechaComponent', () => {
  let component: EntregaProductoPorFechaComponent;
  let fixture: ComponentFixture<EntregaProductoPorFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaProductoPorFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaProductoPorFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
