import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEntradaRecuperarComponent } from './nota-entrada-recuperar.component';

describe('NotaEntradaRecuperarComponent', () => {
  let component: NotaEntradaRecuperarComponent;
  let fixture: ComponentFixture<NotaEntradaRecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaEntradaRecuperarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaEntradaRecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
