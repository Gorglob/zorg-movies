import { ZorglobAdminService } from './../../services/zorglobAdminService';
import { Movie } from './../../dto/Movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ZorglobConfigService } from '../../services/zorglobConfigService';

/**
 * Generated class for the DetailFilmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-film',
  templateUrl: 'detail-film.html',
})
export class DetailFilmPage {

  currentMovie: Movie;
  adminMode: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private zorglobConfigService: ZorglobConfigService,
    private zorglobAdminService: ZorglobAdminService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.currentMovie = navParams.get('movie');
    // console.info("currentMovie", this.currentMovie);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailFilmPage');
    this.adminMode = this.zorglobConfigService.isAdmin();
  }

  getFTPFolder(path: string) {
    let returnPath = "";
    var moviePathSplit = path.split("\\");

    if (path.toLowerCase().indexOf("blu-ray") !== -1) {
      returnPath = "/Blu-ray";
    } else if (path.toLowerCase().indexOf("films") !== -1) {
      returnPath = "/Films";
    } else if (path.toLowerCase().indexOf("dessins animés") !== -1) {
      returnPath = "/Dessins-Animés";
    } else if(path.toLowerCase().indexOf("uhd") !== -1) {
        returnPath = "/UHD";
    } else {
      returnPath = "";
    }

    return returnPath + "/" + moviePathSplit[moviePathSplit.length - 1];
  }

  deleteMovie(movie: Movie) {
    const loader = this.loadingCtrl.create({
      content: "Merci de patienter..."
    });
    loader.present();

    this.zorglobAdminService.deleteDoublon(this.zorglobConfigService.getPassword(), movie.MovieDirectory).then((data) => {
      loader.dismiss();
      if (data === true) {
        let toast = this.toastCtrl.create({
          message: `${movie.MovieTitle} a été supprimé.`,
          duration: 3000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fermer',
          cssClass: 'toast-color'
        });
        toast.present();
      }
      else {
        let toast = this.toastCtrl.create({
          message: `${movie.MovieTitle} n'a pas pu être supprimé.`,
          duration: 10000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fermer',
          cssClass: 'toast-color'
        });
        toast.present();
      }
    }).catch((error) => {
      loader.dismiss();
      let toast = this.toastCtrl.create({
        message: error.json().Message,
        duration: 10000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Fermer',
        cssClass: 'toast-color'
      });
      toast.present();
    })

  }
}
