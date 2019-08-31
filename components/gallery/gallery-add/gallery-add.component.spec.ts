import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAddComponent } from './gallery-add.component';
import { NavigationModule, TestingHelper } from '../../../imports';
import { RouterTestingModule } from '@angular/router/testing';

describe('GalleryAddComponent', () => {
  let component: GalleryAddComponent;
  let fixture: ComponentFixture<GalleryAddComponent>;

  const testingHelper = new TestingHelper();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryAddComponent],
      imports: [
        NavigationModule,
        RouterTestingModule.withRoutes(testingHelper.routes)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
