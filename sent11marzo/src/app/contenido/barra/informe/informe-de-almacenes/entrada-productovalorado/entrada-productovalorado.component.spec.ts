import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaProductovaloradoComponent } from './entrada-productovalorado.component';

describe('EntradaProductovaloradoComponent', () => {
  let component: EntradaProductovaloradoComponent;
  let fixture: ComponentFixture<EntradaProductovaloradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaProductovaloradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaProductovaloradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
