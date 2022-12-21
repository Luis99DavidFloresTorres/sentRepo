import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientporUsuarioComponent } from './seguimientpor-usuario.component';

describe('SeguimientporUsuarioComponent', () => {
  let component: SeguimientporUsuarioComponent;
  let fixture: ComponentFixture<SeguimientporUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientporUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientporUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
