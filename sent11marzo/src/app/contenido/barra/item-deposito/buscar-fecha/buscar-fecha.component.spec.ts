import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarFechaComponent } from './buscar-fecha.component';

describe('BuscarFechaComponent', () => {
  let component: BuscarFechaComponent;
  let fixture: ComponentFixture<BuscarFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
