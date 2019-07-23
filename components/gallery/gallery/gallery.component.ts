import { Component, OnInit } from '@angular/core';
import { ExtraRequestService } from 'src/app/extra/services/extra-request.service';
import { ExtraService } from 'src/app/extra/services/extra.service';
import { HelpersService } from 'src/app/auth/imports';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  pagination: any;

  GALLERY_URL: string;

  get isPageReady(): boolean {
    return this.pagination && true;
  }

  constructor(
    private requestService: ExtraRequestService,
    private service: ExtraService,
    private helpersService: HelpersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.GALLERY_URL = this.requestService.MAIN_URI + 'images/gallery-thumb/';
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      switchMap((params: Params) => {
        this.pagination = null;

        return this.requestService.getGalleryPaginate(
          +params['page-size'] || this.service.defaultPageSize,
          +params['page'] || 0
        );
      })
    ).subscribe(response => this.pagination = response);
  }

}
