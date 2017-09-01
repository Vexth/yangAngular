import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JngzwhopenComponent } from './jngzwhopen.component';

describe('JngzwhopenComponent', () => {
  let component: JngzwhopenComponent;
  let fixture: ComponentFixture<JngzwhopenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JngzwhopenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JngzwhopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
