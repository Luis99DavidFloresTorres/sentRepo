import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeproductosSerialesComponent } from './lista-deproductos-seriales.component';

describe('ListaDeproductosSerialesComponent', () => {
  let component: ListaDeproductosSerialesComponent;
  let fixture: ComponentFixture<ListaDeproductosSerialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeproductosSerialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeproductosSerialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
