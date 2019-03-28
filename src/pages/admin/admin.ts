import { ZorglobConfigService } from './../../services/zorglobConfigService';
import { AdminMoviePage } from './../admin-movie/admin-movie';
import { Movie } from './../../dto/Movie';
import { ZorglobAdminService } from './../../services/zorglobAdminService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  password: string = "";
  movies: any[];
  doublons: any[];
  adminMode: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private zorglobAdminService: ZorglobAdminService,
    private zorglobConfigService: ZorglobConfigService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController) {
    this.password = navParams.get('password');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
    this.adminMode = this.zorglobConfigService.isAdmin();
  }

  updateBdd() {
    const loader = this.loadingCtrl.create({
      content: "Merci de patienter..."
    });
    loader.present();

    this.zorglobAdminService.updateBdd(this.password).then((data) => {
      loader.dismiss();
      let toast = this.toastCtrl.create({
        message: data,
        duration: 10000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Fermer',
        cssClass: 'toast-color'
      });
      toast.present();
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

  getUnfoundMovies() {
    const loader = this.loadingCtrl.create({
      content: "Merci de patienter..."
    });
    loader.present();

    this.zorglobAdminService.getUnfoundMovies(this.password).then((data) => {
      loader.dismiss();
      this.movies = data;
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

  searchMovie(movie: any) {
    let modal = this.modalCtrl.create(AdminMoviePage, { movie, password: this.password });
    modal.onDidDismiss(tmdbMovieId => {
      if (tmdbMovieId) {
        movie.updating = true;
        this.zorglobAdminService.updateMovie(this.password, movie.MovieId, tmdbMovieId).then((response) => {
          movie.updating = false;
          movie.updated = response;
          console.info("response", response);
          if (response) {
            this.movies.splice(this.movies.indexOf(movie), 1);
            let toast = this.toastCtrl.create({
              message: `${movie.MovieTitle} a été mis à jour.`,
              duration: 3000,
              position: 'top',
              showCloseButton: true,
              closeButtonText: 'Fermer',
              cssClass: 'toast-color'
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: `${movie.MovieTitle} a été mis à jour.`,
              duration: 10000,
              position: 'top',
              showCloseButton: true,
              closeButtonText: 'Fermer',
              cssClass: 'toast-color'
            });
            toast.present();
          }
        }).catch((error) => {
          movie.updating = false;
          movie.updated = false;
          console.error("Erreur updateMovie", error);
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
    });
    modal.present();
  }

  getDoublons() {
    const loader = this.loadingCtrl.create({
      content: "Merci de patienter..."
    });
    loader.present();

    this.zorglobAdminService.getDoublons(this.password).then((data) => {
      loader.dismiss();
      this.doublons = data;
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

  deleteMovie(movie: any, file: string) {
    movie.deleting = true;
    this.zorglobAdminService.deleteDoublon(this.password, file).then((data) => {
      if (data === true) {
        this.doublons.splice(this.doublons.indexOf(movie), 1);
        let toast = this.toastCtrl.create({
          message: `${movie.Movie.MovieTitle} a été supprimé.`,
          duration: 3000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fermer',
          cssClass: 'toast-color'
        });
        toast.present();
      }
      else {
        movie.error = true;
        let toast = this.toastCtrl.create({
          message: `${movie.Movie.MovieTitle} n'a pas pu être supprimé.`,
          duration: 10000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Fermer',
          cssClass: 'toast-color'
        });
        toast.present();
      }
      movie.deleting = false;
    }).catch((error) => {
      movie.deleting = false;
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

  displayOnlyFileName(file: string) {
    return file.split("\\")[file.split("\\").length - 1];
  }

  toggleAdminMode(adminMode: boolean) {
    this.zorglobAdminService.setAdminMode(adminMode);
  }
}
