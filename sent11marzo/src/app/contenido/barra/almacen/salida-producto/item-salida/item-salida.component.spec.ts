import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSalidaComponent } from './item-salida.component';

describe('ItemSalidaComponent', () => {
  let component: ItemSalidaComponent;
  let fixture: ComponentFixture<ItemSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
