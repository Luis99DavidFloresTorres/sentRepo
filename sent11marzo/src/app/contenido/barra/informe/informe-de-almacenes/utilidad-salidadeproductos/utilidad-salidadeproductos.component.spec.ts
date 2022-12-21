import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilidadSalidadeproductosComponent } from './utilidad-salidadeproductos.component';

describe('UtilidadSalidadeproductosComponent', () => {
  let component: UtilidadSalidadeproductosComponent;
  let fixture: ComponentFixture<UtilidadSalidadeproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilidadSalidadeproductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilidadSalidadeproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
