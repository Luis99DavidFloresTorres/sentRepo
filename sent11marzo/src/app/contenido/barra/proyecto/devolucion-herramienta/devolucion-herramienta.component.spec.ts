import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionHerramientaComponent } from './devolucion-herramienta.component';

describe('DevolucionHerramientaComponent', () => {
  let component: DevolucionHerramientaComponent;
  let fixture: ComponentFixture<DevolucionHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionHerramientaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
