import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroProyectoComponent } from './cobro-proyecto.component';

describe('CobroProyectoComponent', () => {
  let component: CobroProyectoComponent;
  let fixture: ComponentFixture<CobroProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobroProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CobroProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
