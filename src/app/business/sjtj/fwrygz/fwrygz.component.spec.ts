import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FwrygzComponent } from './fwrygz.component';

describe('FwrygzComponent', () => {
  let component: FwrygzComponent;
  let fixture: ComponentFixture<FwrygzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FwrygzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FwrygzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
