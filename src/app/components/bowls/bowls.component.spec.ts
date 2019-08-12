import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlsComponent } from './bowls.component';

describe('BowlsComponent', () => {
  let component: BowlsComponent;
  let fixture: ComponentFixture<BowlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BowlsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
