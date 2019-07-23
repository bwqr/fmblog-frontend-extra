import { Injectable } from '@angular/core';
import { MainService } from '../imports';

@Injectable({
  providedIn: 'root'
})
export class ExtraService extends MainService {

  constructor() {
    super();
  }
}
