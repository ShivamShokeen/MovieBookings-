import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeatsPage } from './seats.page';

describe('SeatsPage', () => {
  let component: SeatsPage;
  let fixture: ComponentFixture<SeatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
