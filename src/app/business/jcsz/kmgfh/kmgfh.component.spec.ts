import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KmgfhComponent } from './kmgfh.component';

describe('KmgfhComponent', () => {
  let component: KmgfhComponent;
  let fixture: ComponentFixture<KmgfhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KmgfhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmgfhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
