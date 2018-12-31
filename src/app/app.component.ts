import { ErrorPage } from './../pages/error/error';
import { ZorglobConfigService } from './../services/zorglobConfigService';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private zorglobConfigService: ZorglobConfigService) {
    this.zorglobConfigService.initApiUrls().then((response) => {
      if(response){
        this.zorglobConfigService.getGenres();
        this.zorglobConfigService.getSortNames().then(() => {
          this.rootPage = HomePage;
          this.initializeApp();
        });
      }
      else {
        this.rootPage = ErrorPage;
        this.initializeApp();
      }      
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      { title: 'Erreur', component: ErrorPage }
    ];

  }

  initializeApp() {
    console.info("initializeApp 1");
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.info("initializeApp 2");      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
