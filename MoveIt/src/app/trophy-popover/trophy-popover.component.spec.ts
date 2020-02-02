import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyPopover } from './trophy-popover.component';

describe('TrophyPopoverComponent', () => {
  let component: TrophyPopover;
  let fixture: ComponentFixture<TrophyPopover>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrophyPopover ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrophyPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
