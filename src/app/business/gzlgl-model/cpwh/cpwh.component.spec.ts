import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpwhComponent } from './cpwh.component';

describe('CpwhComponent', () => {
  let component: CpwhComponent;
  let fixture: ComponentFixture<CpwhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpwhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpwhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
