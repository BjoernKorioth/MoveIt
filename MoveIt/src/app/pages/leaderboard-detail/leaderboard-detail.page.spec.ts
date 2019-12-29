import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardDetailPage } from './leaderboard-detail.page';

describe('LeaderboardDetailPage', () => {
  let component: LeaderboardDetailPage;
  let fixture: ComponentFixture<LeaderboardDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
