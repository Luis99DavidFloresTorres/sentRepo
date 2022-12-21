import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsOrdenCompraComponent } from './items-orden-compra.component';

describe('ItemsOrdenCompraComponent', () => {
  let component: ItemsOrdenCompraComponent;
  let fixture: ComponentFixture<ItemsOrdenCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsOrdenCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
