import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaOrdenCompraComponent } from './nota-orden-compra.component';

describe('NotaOrdenCompraComponent', () => {
  let component: NotaOrdenCompraComponent;
  let fixture: ComponentFixture<NotaOrdenCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaOrdenCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
