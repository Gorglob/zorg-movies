import { Movie } from './../../dto/Movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentMovie = navParams.get('movie');
    // console.info("currentMovie", this.currentMovie);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailFilmPage');
  }

  getFTPFolder(path: string){
    let returnPath = "";
    var moviePathSplit = path.split("\\");

    if(path.toLowerCase().indexOf("blu-ray") !== -1){
      returnPath = "/Blu-ray";
    }else if(path.toLowerCase().indexOf("films") !== -1){
      returnPath = "/Films";
    }else if(path.toLowerCase().indexOf("dessins animés")){
      returnPath = "/Dessins-Animés";
    }

    return returnPath + "/" + moviePathSplit[moviePathSplit.length - 1];
  }

}
