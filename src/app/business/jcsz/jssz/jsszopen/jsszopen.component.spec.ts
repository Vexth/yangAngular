import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsszopenComponent } from './jsszopen.component';

describe('JsszopenComponent', () => {
  let component: JsszopenComponent;
  let fixture: ComponentFixture<JsszopenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsszopenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsszopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
