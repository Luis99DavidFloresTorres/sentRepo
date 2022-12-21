import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDegarantiasComponent } from './informe-degarantias.component';

describe('InformeDegarantiasComponent', () => {
  let component: InformeDegarantiasComponent;
  let fixture: ComponentFixture<InformeDegarantiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeDegarantiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeDegarantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
