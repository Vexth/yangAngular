import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { M1v1openComponent } from './m1v1open.component';

describe('M1v1openComponent', () => {
  let component: M1v1openComponent;
  let fixture: ComponentFixture<M1v1openComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ M1v1openComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(M1v1openComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
