import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExtraRequestService } from 'src/app/extra/services/extra-request.service';
import { ExtraService } from 'src/app/extra/services/extra.service';
import { HelpersService } from 'src/app/auth/imports';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  pagination: any;

  GALLERY_URL: string;

  save = false;

  pageOptions: any;

  subs = new Subscription();

  get isPageReady(): boolean {
    return this.pagination && true;
  }

  constructor(
    private requestService: ExtraRequestService,
    private service: ExtraService,
    private helpersService: HelpersService,
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.GALLERY_URL = this.requestService.makeUrl('storage.gallery.thumbs');
  }

  ngOnInit() {
    this.subs.add(

      this.activatedRoute.queryParams.pipe(
        switchMap((params: Params) => {
          this.pagination = null;

          this.pageOptions = {
            'page-size': +params['page-size'] || this.service.defaultPageSize,
            'page': +params['page'] || 1
          };

          return this.requestService.getGalleryPaginate(
            +params['page-size'] || this.service.defaultPageSize,
            +params['page'] || 1
          );
        })
      ).subscribe(response => this.pagination = response)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  drop(event: any) {
    const itemElement = event.item.element.nativeElement;

    const column = Math.floor(event.container.element.nativeElement.clientWidth / itemElement.clientWidth);
    const row = Math.ceil(this.pagination.data.length / column);

    const itemDim = { witdh: itemElement.clientWidth, height: itemElement.clientHeight };

    let xIndex = Math.floor((event.distance.x + event.item._dragRef._pickupPositionInElement.x) / itemDim.witdh);
    let yIndex = Math.floor((event.distance.y + event.item._dragRef._pickupPositionInElement.y) / itemDim.height);

    xIndex = Math.min(Math.max(xIndex, -(event.previousIndex % column)), column - 1);
    yIndex = Math.min(Math.max(yIndex, -Math.floor(event.previousIndex / column)), row - 1);

    const index = (Math.floor(event.previousIndex / column) + yIndex) * column +
      ((event.previousIndex % column) + xIndex);

    if (event.previousIndex !== index) {
      this.pagination.data.splice(event.previousIndex, 1);
      this.pagination.data.splice(index, 0, event.item.data);

      this.save = true;
    }
  }

  deleteGallery(event: any) {
    if (!this.save) {
      this.subs.add(
        this.requestService.deleteGallery(event.item.data.id)
          .subscribe(response => {
            this.service.openSnack(this.snackBar, {
              message: 'İşlem Başarılı',
              action: 'Tamam'
            }, true);
            this.pagination.data.splice(event.previousIndex, 1);
          })
      );
    }
  }

  saveOrder() {
    const order = this.pagination.data.reduce((result: Array<any>, currentValue: any, currentIndex: number) => {
      const addition = this.pageOptions['page-size'] * (this.pageOptions['page'] - 1);
      result.push({ id: currentValue.id, weight: addition + currentIndex });
      return result;
    }, []);

    this.subs.add(
      this.requestService.putGalleryWeights({ weights: order })
        .subscribe(response => {
          this.service.openSnack(this.snackBar, {
            message: 'İşlem Başarılı',
            action: 'Tamam'
          }, true);
          this.save = false;
        })
    );
  }
}
