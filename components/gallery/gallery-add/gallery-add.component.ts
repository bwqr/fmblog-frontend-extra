import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExtraRequestService } from 'src/app/extra/services/extra-request.service';
import { HelpersService } from '../../../imports';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.scss']
})
export class GalleryAddComponent implements OnInit {

  images: any = [];

  weight: Array<number> = [];

  ID = 0;

  get isPageReady(): boolean {
    return this.images && true;
  }

  @ViewChild('file', { static: false }) file: ElementRef;

  constructor(
    private requestService: ExtraRequestService,
    private helpersService: HelpersService
  ) { }

  ngOnInit() {
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

    this.uploadGallery(0);
  }

  uploadGallery(index: number) {
    const rq1 = this.requestService.putGallery({
      weight: JSON.stringify(this.weight[index]),
    }, this.images[index].file
    ).subscribe((response: any) => {
      if (index < this.images.length - 1) {
        this.uploadGallery(++index);
        rq1.unsubscribe();
      } else {
        this.helpersService.navigate(['/gallery']);
      }
    });
  }
}
