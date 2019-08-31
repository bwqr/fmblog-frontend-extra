import { TestBed, inject, async } from '@angular/core/testing';

import { ExtraRequestService } from './extra-request.service';
import { CoreModule } from 'src/app/core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestingHelper } from '../imports';
import { catchError } from 'rxjs/operators';

describe('FormRequestService', () => {

  let requestService: ExtraRequestService;

  const testingHelper = new TestingHelper();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtraRequestService],
      imports: [
        CoreModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(testingHelper.routes)
      ]
    });

    requestService = TestBed.get(ExtraRequestService);
  });


  it('should be created', inject([ExtraRequestService], (service: ExtraRequestService) => {
    expect(service).toBeTruthy();
  }));

  it('should have correct route for getGalleryPaginate', async(() => {
    requestService.getGalleryPaginate(0, 0)
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for postGallery', async(() => {
    requestService.postGallery({})
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for putGalleryWeights', async(() => {
    requestService.putGalleryWeights({})
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for deleteGallery', async(() => {
    requestService.deleteGallery(0)
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

});
