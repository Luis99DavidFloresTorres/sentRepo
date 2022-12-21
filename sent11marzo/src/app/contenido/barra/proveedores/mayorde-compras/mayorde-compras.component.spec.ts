import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayordeComprasComponent } from './mayorde-compras.component';

describe('MayordeComprasComponent', () => {
  let component: MayordeComprasComponent;
  let fixture: ComponentFixture<MayordeComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayordeComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MayordeComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
