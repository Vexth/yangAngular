import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RyjndjComponent } from './ryjndj.component';

describe('RyjndjComponent', () => {
  let component: RyjndjComponent;
  let fixture: ComponentFixture<RyjndjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RyjndjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RyjndjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
