import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JngzwhComponent } from './jngzwh.component';

describe('JngzwhComponent', () => {
  let component: JngzwhComponent;
  let fixture: ComponentFixture<JngzwhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JngzwhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JngzwhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
