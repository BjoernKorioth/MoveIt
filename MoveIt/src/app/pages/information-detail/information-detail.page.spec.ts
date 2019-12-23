import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationDetailPage } from './information-detail.page';

describe('InformationDetailPage', () => {
  let component: InformationDetailPage;
  let fixture: ComponentFixture<InformationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
