import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargogastosComponent } from './descargogastos.component';

describe('DescargogastosComponent', () => {
  let component: DescargogastosComponent;
  let fixture: ComponentFixture<DescargogastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargogastosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargogastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
