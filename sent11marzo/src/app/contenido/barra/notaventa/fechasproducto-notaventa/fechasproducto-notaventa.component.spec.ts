import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasproductoNotaventaComponent } from './fechasproducto-notaventa.component';

describe('FechasproductoNotaventaComponent', () => {
  let component: FechasproductoNotaventaComponent;
  let fixture: ComponentFixture<FechasproductoNotaventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechasproductoNotaventaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechasproductoNotaventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
