import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarNombreFechaComponent } from './buscar-nombre-fecha.component';

describe('BuscarNombreFechaComponent', () => {
  let component: BuscarNombreFechaComponent;
  let fixture: ComponentFixture<BuscarNombreFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarNombreFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarNombreFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
