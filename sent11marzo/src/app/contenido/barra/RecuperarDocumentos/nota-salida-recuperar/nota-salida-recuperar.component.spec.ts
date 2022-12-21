import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaSalidaRecuperarComponent } from './nota-salida-recuperar.component';

describe('NotaSalidaRecuperarComponent', () => {
  let component: NotaSalidaRecuperarComponent;
  let fixture: ComponentFixture<NotaSalidaRecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaSalidaRecuperarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaSalidaRecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
