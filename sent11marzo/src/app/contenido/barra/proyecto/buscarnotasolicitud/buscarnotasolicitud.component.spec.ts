import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarnotasolicitudComponent } from './buscarnotasolicitud.component';

describe('BuscarnotasolicitudComponent', () => {
  let component: BuscarnotasolicitudComponent;
  let fixture: ComponentFixture<BuscarnotasolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarnotasolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarnotasolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
