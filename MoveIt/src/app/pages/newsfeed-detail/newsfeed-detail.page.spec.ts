import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedDetailPage } from './newsfeed-detail.page';

describe('NewsfeedDetailPage', () => {
  let component: NewsfeedDetailPage;
  let fixture: ComponentFixture<NewsfeedDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
