import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entre2fechasproductoComponent } from './entre2fechasproducto.component';

describe('Entre2fechasproductoComponent', () => {
  let component: Entre2fechasproductoComponent;
  let fixture: ComponentFixture<Entre2fechasproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Entre2fechasproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Entre2fechasproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
