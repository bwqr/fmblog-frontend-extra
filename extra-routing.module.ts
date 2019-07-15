import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './imports';
import { GalleryComponent } from './components/gallery/gallery/gallery.component';
import { GalleryAddComponent } from './components/gallery/gallery-add/gallery-add.component';
import { GalleryEditComponent } from './components/gallery/gallery-edit/gallery-edit.component';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { path: 'gallery', component: GalleryComponent },
      { path: 'gallery/add', component: GalleryAddComponent },
      { path: 'gallery/image/:image', component: GalleryEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraRoutingModule { }
