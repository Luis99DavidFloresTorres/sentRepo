import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarFormProductoComponent } from './mostrar-form-producto.component';

describe('MostrarFormProductoComponent', () => {
  let component: MostrarFormProductoComponent;
  let fixture: ComponentFixture<MostrarFormProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarFormProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarFormProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
