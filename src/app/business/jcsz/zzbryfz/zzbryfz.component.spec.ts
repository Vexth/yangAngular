/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZzbryfzComponent } from './zzbryfz.component';

describe('ZzbryfzComponent', () => {
  let component: ZzbryfzComponent;
  let fixture: ComponentFixture<ZzbryfzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZzbryfzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZzbryfzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
