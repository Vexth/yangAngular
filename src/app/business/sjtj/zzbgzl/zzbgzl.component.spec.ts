import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzbgzlComponent } from './zzbgzl.component';

describe('ZzbgzlComponent', () => {
  let component: ZzbgzlComponent;
  let fixture: ComponentFixture<ZzbgzlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZzbgzlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZzbgzlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
