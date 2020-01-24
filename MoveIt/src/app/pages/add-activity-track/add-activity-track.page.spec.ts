import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityTrackPage } from './add-activity-track.page';

describe('AddActivityTrackPage', () => {
  let component: AddActivityTrackPage;
  let fixture: ComponentFixture<AddActivityTrackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActivityTrackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActivityTrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
