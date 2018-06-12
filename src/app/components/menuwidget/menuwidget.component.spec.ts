import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuwidgetComponent } from './menuwidget.component';

describe('MenuwidgetComponent', () => {
  let component: MenuwidgetComponent;
  let fixture: ComponentFixture<MenuwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuwidgetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
