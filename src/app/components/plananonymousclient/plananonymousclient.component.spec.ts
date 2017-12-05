import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlananonymousclientComponent } from './plananonymousclient.component';

describe('PlananonymousclientComponent', () => {
  let component: PlananonymousclientComponent;
  let fixture: ComponentFixture<PlananonymousclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlananonymousclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlananonymousclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
