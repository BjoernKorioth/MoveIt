import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoalPage } from './edit-goal.page';

describe('EditGoalPage', () => {
  let component: EditGoalPage;
  let fixture: ComponentFixture<EditGoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGoalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
