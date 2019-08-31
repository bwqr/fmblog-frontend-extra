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

  postGallery(image: any) {
    const url = this.makeUrl('extra.gallery', '?token=' + this.helpersService.getToken());

    const formData = new FormData();

    formData.append('file', image);

    return this.http.post(url, formData);
  }

  putGalleryWeights(data: any): Observable<any> {
    return this.makePutRequest('extra.gallery.weights', data);
  }

  deleteGallery(id: number): Observable<any> {
    return this.makeDeleteRequest('extra.gallery', `${id}`);
  }
}
