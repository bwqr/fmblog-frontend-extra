import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraRoutingModule } from './extra-routing.module';
import { NavigationModule } from '../navigation/navigation.module';

import { GalleryComponent } from './components/gallery/gallery/gallery.component';
import { GalleryAddComponent } from './components/gallery/gallery-add/gallery-add.component';
import { GalleryEditComponent } from './components/gallery/gallery-edit/gallery-edit.component';

@NgModule({
  declarations: [
    GalleryComponent,
    GalleryAddComponent,
    GalleryEditComponent
  ],
  imports: [
    CommonModule,
    ExtraRoutingModule,
    NavigationModule
  ]
})
export class ExtraModule { }
