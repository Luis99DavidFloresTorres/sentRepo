import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsNotaVentaComponent } from './items-nota-venta.component';

describe('ItemsNotaVentaComponent', () => {
  let component: ItemsNotaVentaComponent;
  let fixture: ComponentFixture<ItemsNotaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsNotaVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsNotaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
