import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDepositoComponent } from './item-deposito.component';

describe('ItemDepositoComponent', () => {
  let component: ItemDepositoComponent;
  let fixture: ComponentFixture<ItemDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
