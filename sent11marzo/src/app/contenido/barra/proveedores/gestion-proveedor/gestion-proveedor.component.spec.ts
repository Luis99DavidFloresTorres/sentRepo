import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProveedorComponent } from './gestion-proveedor.component';

describe('GestionProveedorComponent', () => {
  let component: GestionProveedorComponent;
  let fixture: ComponentFixture<GestionProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
