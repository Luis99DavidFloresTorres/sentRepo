import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCotizclienteComponent } from './items-cotizcliente.component';

describe('ItemsCotizclienteComponent', () => {
  let component: ItemsCotizclienteComponent;
  let fixture: ComponentFixture<ItemsCotizclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsCotizclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsCotizclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
