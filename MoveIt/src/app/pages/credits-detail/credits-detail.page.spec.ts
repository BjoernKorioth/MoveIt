import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsDetailPage } from './credits-detail.page';

describe('CreditsDetailPage', () => {
  let component: CreditsDetailPage;
  let fixture: ComponentFixture<CreditsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditsDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
