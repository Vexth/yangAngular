import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpgzlopenComponent } from './spgzlopen.component';

describe('SpgzlopenComponent', () => {
  let component: SpgzlopenComponent;
  let fixture: ComponentFixture<SpgzlopenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpgzlopenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpgzlopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
