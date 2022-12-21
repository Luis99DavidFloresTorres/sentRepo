import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGestionclienteComponent } from './formulario-gestioncliente.component';

describe('FormularioGestionclienteComponent', () => {
  let component: FormularioGestionclienteComponent;
  let fixture: ComponentFixture<FormularioGestionclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioGestionclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioGestionclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
