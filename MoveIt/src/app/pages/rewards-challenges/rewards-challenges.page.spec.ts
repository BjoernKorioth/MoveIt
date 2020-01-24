import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsChallengesPage } from './rewards-challenges.page';

describe('RewardsChallengesPage', () => {
  let component: RewardsChallengesPage;
  let fixture: ComponentFixture<RewardsChallengesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsChallengesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsChallengesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
