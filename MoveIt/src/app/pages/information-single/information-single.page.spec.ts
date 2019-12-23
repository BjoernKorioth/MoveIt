import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSinglePage } from './information-single.page';

describe('InformationSinglePage', () => {
  let component: InformationSinglePage;
  let fixture: ComponentFixture<InformationSinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationSinglePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
