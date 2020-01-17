import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityManualPage } from './add-activity-manual.page';

describe('AddActivityManualPage', () => {
  let component: AddActivityManualPage;
  let fixture: ComponentFixture<AddActivityManualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActivityManualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActivityManualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
