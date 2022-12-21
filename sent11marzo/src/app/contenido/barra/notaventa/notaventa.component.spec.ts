import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaventaComponent } from './notaventa.component';

describe('NotaventaComponent', () => {
  let component: NotaventaComponent;
  let fixture: ComponentFixture<NotaventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaventaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
