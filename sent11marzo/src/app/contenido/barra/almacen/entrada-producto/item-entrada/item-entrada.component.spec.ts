import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEntradaComponent } from './item-entrada.component';

describe('ItemEntradaComponent', () => {
  let component: ItemEntradaComponent;
  let fixture: ComponentFixture<ItemEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
