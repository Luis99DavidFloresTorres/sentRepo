import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNivelComponent } from './agregar-nivel.component';

describe('AgregarNivelComponent', () => {
  let component: AgregarNivelComponent;
  let fixture: ComponentFixture<AgregarNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
