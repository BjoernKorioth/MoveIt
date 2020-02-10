import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewPage } from './profile-view.page';

describe('ProfileViewPage', () => {
  let component: ProfileViewPage;
  let fixture: ComponentFixture<ProfileViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
