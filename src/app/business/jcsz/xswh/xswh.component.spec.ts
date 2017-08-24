import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XswhComponent } from './xswh.component';

describe('XswhComponent', () => {
  let component: XswhComponent;
  let fixture: ComponentFixture<XswhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XswhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XswhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
