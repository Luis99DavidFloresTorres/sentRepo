import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasporClienteComponent } from './ventaspor-cliente.component';

describe('VentasporClienteComponent', () => {
  let component: VentasporClienteComponent;
  let fixture: ComponentFixture<VentasporClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasporClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasporClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
