import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarHerramientaComponent } from './buscar-herramienta.component';

describe('BuscarHerramientaComponent', () => {
  let component: BuscarHerramientaComponent;
  let fixture: ComponentFixture<BuscarHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarHerramientaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
