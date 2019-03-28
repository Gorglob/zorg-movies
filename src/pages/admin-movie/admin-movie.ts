import { Movie } from './../../dto/Movie';
import { ZorglobAdminService } from './../../services/zorglobAdminService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AdminMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


const TMDB_IMG_PATH = "https://image.tmdb.org/t/p/original/";

@IonicPage()
@Component({
  selector: 'page-admin-movie',
  templateUrl: 'admin-movie.html',
})
export class AdminMoviePage {
  movie2Update: Movie;
  password: string;
  movies: Movie[];
  selectedMovie: any;
  newSearch: string;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private zorglobAdminService: ZorglobAdminService,
    private loadingCtrl : LoadingController
  ) {
    this.movie2Update = navParams.get('movie');
    this.password = navParams.get('password');
    this.newSearch = this.movie2Update.MovieTitle;  
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Merci de patienter..."
    });
    loader.present();

    this.zorglobAdminService.getSearchResult(this.password, this.movie2Update.MovieTitle).then((data) => {
      this.movies = data;
      loader.dismiss();
    });
  }

  getImgPath(path: string) {
    return `${TMDB_IMG_PATH}${path}`;
  }

  updateMovie() {    
    this.viewCtrl.dismiss(this.selectedMovie);    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  newSearchMovie(){
    const loader = this.loadingCtrl.create({
      content: "Merci de patienter..."
    });
    loader.present();
    
    this.zorglobAdminService.getSearchResult(this.password, this.newSearch).then((data) => {
      this.movies = data;
      loader.dismiss();
    });
  }

}
