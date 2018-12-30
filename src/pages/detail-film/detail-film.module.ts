import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailFilmPage } from './detail-film';

@NgModule({
  declarations: [
    DetailFilmPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailFilmPage),
  ],
})
export class DetailFilmPageModule {}
