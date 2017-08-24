import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { M4v2Component } from './m4v2.component';

describe('M4v2Component', () => {
  let component: M4v2Component;
  let fixture: ComponentFixture<M4v2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ M4v2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(M4v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
