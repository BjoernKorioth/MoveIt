import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityDetailPage } from './add-activity-detail.page';

describe('AddActivityDetailPage', () => {
  let component: AddActivityDetailPage;
  let fixture: ComponentFixture<AddActivityDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActivityDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActivityDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
