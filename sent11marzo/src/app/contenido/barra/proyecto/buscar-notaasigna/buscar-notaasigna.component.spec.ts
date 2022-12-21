import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarNotaasignaComponent } from './buscar-notaasigna.component';

describe('BuscarNotaasignaComponent', () => {
  let component: BuscarNotaasignaComponent;
  let fixture: ComponentFixture<BuscarNotaasignaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarNotaasignaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarNotaasignaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
