import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminMoviePage } from './admin-movie';

@NgModule({
  declarations: [
    AdminMoviePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminMoviePage),
  ],
})
export class AdminMoviePageModule {}
