import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreFechasComponent } from './entre-fechas.component';

describe('EntreFechasComponent', () => {
  let component: EntreFechasComponent;
  let fixture: ComponentFixture<EntreFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntreFechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
