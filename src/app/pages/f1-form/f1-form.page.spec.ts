import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { F1FormPage } from './f1-form.page';

describe('F1FormPage', () => {
  let component: F1FormPage;
  let fixture: ComponentFixture<F1FormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ F1FormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(F1FormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
