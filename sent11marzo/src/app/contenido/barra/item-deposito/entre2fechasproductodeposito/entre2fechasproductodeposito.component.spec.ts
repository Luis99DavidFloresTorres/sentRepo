import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entre2fechasproductodepositoComponent } from './entre2fechasproductodeposito.component';

describe('Entre2fechasproductodepositoComponent', () => {
  let component: Entre2fechasproductodepositoComponent;
  let fixture: ComponentFixture<Entre2fechasproductodepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Entre2fechasproductodepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Entre2fechasproductodepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
