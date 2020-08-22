import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessSignupPage } from './business-signup.page';

describe('BusinessSignupPage', () => {
  let component: BusinessSignupPage;
  let fixture: ComponentFixture<BusinessSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSignupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
