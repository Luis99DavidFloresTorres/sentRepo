import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionHerramientaComponent } from './asignacion-herramienta.component';

describe('AsignacionHerramientaComponent', () => {
  let component: AsignacionHerramientaComponent;
  let fixture: ComponentFixture<AsignacionHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionHerramientaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
