import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OstanAddPage } from './ostan-add.page';

describe('OstanAddPage', () => {
  let component: OstanAddPage;
  let fixture: ComponentFixture<OstanAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OstanAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OstanAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
