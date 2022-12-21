import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaProductoporClienteComponent } from './entrega-productopor-cliente.component';

describe('EntregaProductoporClienteComponent', () => {
  let component: EntregaProductoporClienteComponent;
  let fixture: ComponentFixture<EntregaProductoporClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaProductoporClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaProductoporClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
