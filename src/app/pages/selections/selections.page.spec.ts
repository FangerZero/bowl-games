import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionsPage } from './selections.page';

describe('SelectionsPage', () => {
  let component: SelectionsPage;
  let fixture: ComponentFixture<SelectionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
