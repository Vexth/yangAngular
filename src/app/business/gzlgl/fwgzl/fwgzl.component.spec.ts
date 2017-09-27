import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CygzlComponent } from './cygzl.component';

describe('CygzlComponent', () => {
  let component: CygzlComponent;
  let fixture: ComponentFixture<CygzlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CygzlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CygzlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
