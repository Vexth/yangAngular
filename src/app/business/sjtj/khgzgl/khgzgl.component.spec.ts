import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhgzglComponent } from './khgzgl.component';

describe('KhgzglComponent', () => {
  let component: KhgzglComponent;
  let fixture: ComponentFixture<KhgzglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhgzglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhgzglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
