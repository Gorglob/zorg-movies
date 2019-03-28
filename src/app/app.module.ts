import { AdminMoviePage } from './../pages/admin-movie/admin-movie';
import { ZorglobAdminService } from './../services/zorglobAdminService';
import { AdminPage } from './../pages/admin/admin';

import { ZorglobConfigService } from './../services/zorglobConfigService';
import { DetailFilmPage } from './../pages/detail-film/detail-film';
import { ZorglobMovieService } from './../services/zorglobMovieService';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ErrorPage } from './../pages/error/error';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PopoverMenuComponent } from '../components/popover-menu/popover-menu';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PopoverMenuComponent,
    DetailFilmPage,
    ErrorPage,
    AdminPage,
    AdminMoviePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    }),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PopoverMenuComponent,
    DetailFilmPage,
    ErrorPage,
    AdminPage,
    AdminMoviePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ZorglobConfigService,
    ZorglobMovieService,    
    ZorglobAdminService
  ]
})
export class AppModule {}
