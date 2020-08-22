import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMoviePage } from './edit-movie.page';

describe('EditMoviePage', () => {
  let component: EditMoviePage;
  let fixture: ComponentFixture<EditMoviePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMoviePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
