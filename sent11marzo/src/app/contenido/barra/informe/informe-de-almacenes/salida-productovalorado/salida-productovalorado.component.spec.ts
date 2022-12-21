import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaProductovaloradoComponent } from './salida-productovalorado.component';

describe('SalidaProductovaloradoComponent', () => {
  let component: SalidaProductovaloradoComponent;
  let fixture: ComponentFixture<SalidaProductovaloradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidaProductovaloradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaProductovaloradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
