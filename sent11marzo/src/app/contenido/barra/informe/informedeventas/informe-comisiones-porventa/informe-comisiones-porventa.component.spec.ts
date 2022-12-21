import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeComisionesPorventaComponent } from './informe-comisiones-porventa.component';

describe('InformeComisionesPorventaComponent', () => {
  let component: InformeComisionesPorventaComponent;
  let fixture: ComponentFixture<InformeComisionesPorventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeComisionesPorventaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeComisionesPorventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
