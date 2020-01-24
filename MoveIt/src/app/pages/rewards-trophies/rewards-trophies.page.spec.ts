import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsTrophiesPage } from './rewards-trophies.page';

describe('RewardsTrophiesPage', () => {
  let component: RewardsTrophiesPage;
  let fixture: ComponentFixture<RewardsTrophiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsTrophiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsTrophiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
