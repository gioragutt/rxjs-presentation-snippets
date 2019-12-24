import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubcribingComponent } from './unsubcribing.component';

describe('UnsubcribingComponent', () => {
  let component: UnsubcribingComponent;
  let fixture: ComponentFixture<UnsubcribingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsubcribingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubcribingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
