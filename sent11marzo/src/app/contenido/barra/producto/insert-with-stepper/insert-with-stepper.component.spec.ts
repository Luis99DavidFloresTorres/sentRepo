import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertWithStepperComponent } from './insert-with-stepper.component';

describe('InsertWithStepperComponent', () => {
  let component: InsertWithStepperComponent;
  let fixture: ComponentFixture<InsertWithStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertWithStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertWithStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
