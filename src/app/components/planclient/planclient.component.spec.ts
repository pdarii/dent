import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanclientComponent } from './planclient.component';

describe('PlanclientComponent', () => {
  let component: PlanclientComponent;
  let fixture: ComponentFixture<PlanclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanclientComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
