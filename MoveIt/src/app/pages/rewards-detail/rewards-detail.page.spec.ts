import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsDetailPage } from './rewards-detail.page';

describe('RewardsDetailPage', () => {
  let component: RewardsDetailPage;
  let fixture: ComponentFixture<RewardsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
