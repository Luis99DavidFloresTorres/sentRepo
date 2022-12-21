import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarOperacionesComponent } from './buscar-operaciones.component';

describe('BuscarOperacionesComponent', () => {
  let component: BuscarOperacionesComponent;
  let fixture: ComponentFixture<BuscarOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarOperacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
