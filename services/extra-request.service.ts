import { Injectable } from '@angular/core';
import { MainRequestService } from '../imports';
import { HttpClient } from '@angular/common/http';
import { HelpersService, RoutingListService } from '../imports';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtraRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  ) {
    super(http, helpersService, routingListService);
  }

  getGalleryPaginate(pageSize: number, pageIndex: number): Observable<any> {
    return this.makeGetRequest('extra.gallery.paginate', `?page=${pageIndex}&per-page=${pageSize}`);
  }

  putGallery(data: any, image: any) {
    const url = this.makeUrl('extra.gallery', '?token=' + this.helpersService.getToken());

    const formData = new FormData();

    formData.append('file', image);


    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {

        formData.append(prop, data[prop]);
      }
    }

    return this.http.post(url, formData);
  }
}
