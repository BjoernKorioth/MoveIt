import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialfeedDetailPage } from './socialfeed-detail.page';

describe('SocialfeedDetailPage', () => {
  let component: SocialfeedDetailPage;
  let fixture: ComponentFixture<SocialfeedDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialfeedDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialfeedDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
