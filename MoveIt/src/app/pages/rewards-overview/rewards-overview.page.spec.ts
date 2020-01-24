import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsOverviewPage } from './rewards-overview.page';

describe('RewardsOverviewPage', () => {
  let component: RewardsOverviewPage;
  let fixture: ComponentFixture<RewardsOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsOverviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
