import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongagoComponent } from './longago.component';

describe('LongagoComponent', () => {
  let component: LongagoComponent;
  let fixture: ComponentFixture<LongagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
