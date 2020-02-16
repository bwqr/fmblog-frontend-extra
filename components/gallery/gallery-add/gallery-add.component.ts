import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExtraRequestService } from 'src/app/extra/services/extra-request.service';
import { HelpersService } from '../../../imports';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.scss']
})
export class GalleryAddComponent implements OnInit, OnDestroy {

  images: any = [];

  weight: Array<number> = [];

  ID = 0;
  // Not yet started
  progressValue = -1;

  subs = new Subscription();

  get isPageReady(): boolean {
    return this.images && true;
  }

  @ViewChild('file') file: ElementRef;

  constructor(
    private requestService: ExtraRequestService,
    private helpersService: HelpersService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  removeImage(id: string) {

    const index = this.images.findIndex((image) => image.id === id);

    this.images.splice(index, 1);
    this.weight.splice(index, 1);
  }

  showImage() {
    const input = this.file.nativeElement;

    for (let i = 0; i < input.files.length; i++) {
      this.images.push({
        id: 'image-' + this.ID,
        file: input.files.item(i)
      });
      this.weight.push(0);

      this.ID++;
    }

    setTimeout(() => {
      for (const image of this.images) {
        const reader = new FileReader();

        const item = document.getElementById('image-' + image.id);

        item.setAttribute('src', '');

        reader.onload = function (e: any) {

          item.setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(image.file);
      }
    }, 0);

  }

  addGallery(f: NgForm) {
    this.progressValue = 0;

    this.uploadGallery(0);
  }

  uploadGallery(index: number) {
    this.progressValue += (100 - this.progressValue) / this.images.length;
    const image = this.images[index];
    this.images.splice(index, 1);
    const rq1 = this.requestService.postGallery(image.file
    ).subscribe((response: any) => {
      if (this.images.length > 0) {
        this.uploadGallery(0);
        rq1.unsubscribe();
      } else {
        this.helpersService.navigate(['/gallery']);
      }
    });
  }

  drop(event: any) {
    const image = this.images[event.previousIndex];
    this.images.splice(event.previousIndex, 1);
    this.images.splice(event.currentIndex, 0, image);
  }
}
