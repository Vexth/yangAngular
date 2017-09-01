import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpgzlComponent } from './spgzl.component';

describe('SpgzlComponent', () => {
  let component: SpgzlComponent;
  let fixture: ComponentFixture<SpgzlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpgzlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpgzlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
