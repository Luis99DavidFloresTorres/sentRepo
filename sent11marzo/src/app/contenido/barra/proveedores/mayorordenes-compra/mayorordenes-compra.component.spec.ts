import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorordenesCompraComponent } from './mayorordenes-compra.component';

describe('MayorordenesCompraComponent', () => {
  let component: MayorordenesCompraComponent;
  let fixture: ComponentFixture<MayorordenesCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayorordenesCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MayorordenesCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
