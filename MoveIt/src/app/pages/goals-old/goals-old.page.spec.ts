import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsOldPage } from './goals-old.page';

describe('GoalsOldPage', () => {
  let component: GoalsOldPage;
  let fixture: ComponentFixture<GoalsOldPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsOldPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsOldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
