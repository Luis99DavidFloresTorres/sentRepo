import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entre2fechasComponent } from './entre2fechas.component';

describe('Entre2fechasComponent', () => {
  let component: Entre2fechasComponent;
  let fixture: ComponentFixture<Entre2fechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Entre2fechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Entre2fechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
