import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoNotaventaComponent } from './encabezado-notaventa.component';

describe('EncabezadoNotaventaComponent', () => {
  let component: EncabezadoNotaventaComponent;
  let fixture: ComponentFixture<EncabezadoNotaventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoNotaventaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoNotaventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
