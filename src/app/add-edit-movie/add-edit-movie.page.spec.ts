import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditMoviePage } from './add-edit-movie.page';

describe('AddEditMoviePage', () => {
  let component: AddEditMoviePage;
  let fixture: ComponentFixture<AddEditMoviePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditMoviePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
