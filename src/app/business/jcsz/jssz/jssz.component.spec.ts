import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsszComponent } from './jssz.component';

describe('JsszComponent', () => {
  let component: JsszComponent;
  let fixture: ComponentFixture<JsszComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsszComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
