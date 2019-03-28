import { ZorglobAdminService } from './../services/zorglobAdminService';
import { AdminPage } from './../pages/admin/admin';
import { ErrorPage } from './../pages/error/error';
import { ZorglobConfigService } from './../services/zorglobConfigService';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any, secure?: boolean }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private zorglobConfigService: ZorglobConfigService,
    private zorglobAdminService: ZorglobAdminService,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {

    this.zorglobConfigService.getGenres();
    this.zorglobConfigService.getSortNames().then(() => {
      this.rootPage = HomePage;
      this.initializeApp();
    }).catch((error) => {
      this.rootPage = ErrorPage;
    })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      { title: 'Admin', component: AdminPage, secure: true }
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
    if (!page.secure)
      this.nav.setRoot(page.component)
    else {
      this.showPasswordCheck(page);
    }
  }

  showPasswordCheck(page) {
    let alert = this.alertCtrl.create({
      title: 'Login',
      message: "Pour accèder à cette page, merci de renseigner le mot de passe",
      cssClass: 'coloredAlert',
      inputs: [
        {
          name: 'password',
          placeholder: 'mot de passe',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            let navTransition = alert.dismiss();

            this.zorglobAdminService.checkPassword(data.password).then((resp) => {
              if (resp) {
                this.zorglobAdminService.setPassword(data.password);
                
                navTransition.then(() => {
                  this.nav.setRoot(page.component, { password : data.password});
                });
              }
              else {
                let toast = this.toastCtrl.create({
                  message: "Mot de passe invalide",
                  duration: 8000,
                  position: 'top',
                  showCloseButton: true,
                  closeButtonText: 'Fermer',
                  cssClass: 'toast-color'
                });
                toast.present();
              }
            });          

            return false;            
          }
        }
      ]
    });
    alert.present();
  }
}
