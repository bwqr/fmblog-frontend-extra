import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryEditComponent } from './gallery-edit.component';
import { NavigationModule, TestingHelper } from '../../../imports';
import { RouterTestingModule } from '@angular/router/testing';

describe('GalleryEditComponent', () => {
  let component: GalleryEditComponent;
  let fixture: ComponentFixture<GalleryEditComponent>;

  const testingHelper = new TestingHelper();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryEditComponent],
      imports: [
        NavigationModule,
        RouterTestingModule.withRoutes(testingHelper.routes)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
