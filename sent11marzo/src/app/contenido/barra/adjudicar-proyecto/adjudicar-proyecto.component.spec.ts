import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjudicarProyectoComponent } from './adjudicar-proyecto.component';

describe('AdjudicarProyectoComponent', () => {
  let component: AdjudicarProyectoComponent;
  let fixture: ComponentFixture<AdjudicarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjudicarProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjudicarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
