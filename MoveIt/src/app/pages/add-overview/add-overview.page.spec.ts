import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOverviewPage } from './add-overview.page';

describe('AddOverviewPage', () => {
  let component: AddOverviewPage;
  let fixture: ComponentFixture<AddOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOverviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
