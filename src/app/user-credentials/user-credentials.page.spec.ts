import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserCredentialsPage } from './user-credentials.page';

describe('UserCredentialsPage', () => {
  let component: UserCredentialsPage;
  let fixture: ComponentFixture<UserCredentialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCredentialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCredentialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
