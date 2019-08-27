import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlsPage } from './bowls.page';

describe('BowlsPage', () => {
  let component: BowlsPage;
  let fixture: ComponentFixture<BowlsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BowlsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
