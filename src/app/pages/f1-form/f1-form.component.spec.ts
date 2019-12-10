import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { F1FormComponent } from './f1-form.component';

describe('F1FormComponent', () => {
  let component: F1FormComponent;
  let fixture: ComponentFixture<F1FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ F1FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(F1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
