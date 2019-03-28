import { ErrorPage } from './../error/error';
import { ZorglobConfigService } from './../../services/zorglobConfigService';
import { DescriptionItem } from './../../dto/DescriptionItem';
import { DetailFilmPage } from './../detail-film/detail-film';
import { PopoverMenuComponent } from './../../components/popover-menu/popover-menu';
import { ZorglobMovieService } from './../../services/zorglobMovieService';
import { Movie } from './../../dto/Movie';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading, InfiniteScroll, PopoverController } from 'ionic-angular';
import * as moment from 'moment';
import * as ZORG_CONSTANTS from '../../constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  movies: Movie[];
  newMovies: Movie[];
  pageIndex: number = 0;
  pageSize: number = 100;
  searchText: string;
  loader: Loading;
  lastDate: Date;
  sortOrder: string;
  genres: DescriptionItem[];
  sortNames: DescriptionItem[];
  selectedSortName: string = ZORG_CONSTANTS.DEFAULT_SORT_NAME;
  selectedGenre: string = ZORG_CONSTANTS.GENRE_TOUS;
  genreTous: string = ZORG_CONSTANTS.GENRE_TOUS;
  displaySearchText: boolean = false;

  constructor(public navCtrl: NavController,
    private zorglobMovieService: ZorglobMovieService,
    private zorglobConfigService: ZorglobConfigService,
    private loadingController: LoadingController,
    public popoverCtrl: PopoverController,

  ) {
    let dtLast = localStorage.getItem(ZORG_CONSTANTS.LAST_DATE);
    //si pas de date on considère que tout les films sont nouveau, on ajoute une date bidon et on stock la date du jour pour la prochaine fois
    if (dtLast == null) {
      localStorage.setItem(ZORG_CONSTANTS.PREC_DATE, moment("01/01/2000", "DD/MM/YYYY").format("DD/MM/YYYY"));
      localStorage.setItem(ZORG_CONSTANTS.LAST_DATE, moment().format("DD/MM/YYYY"));
    }
    else {
      let dt = moment(dtLast, "DD/MM/YYYY");
      let now = moment();
      let diff = moment.duration(now.diff(dt));

      //S'il y a une différence entre la date last et aujourd'hui, on remplace la date prec par la date last 
      if (diff.days() != 0) {
        localStorage.setItem(ZORG_CONSTANTS.PREC_DATE, dt.format("DD/MM/YYYY"));
        localStorage.setItem(ZORG_CONSTANTS.LAST_DATE, moment().format("DD/MM/YYYY"));
      }
    }
  }

  ngOnInit(): void {
    // //Valeurs de tri / genre par défaut
    // this.selectedSortName = ZORG_CONSTANTS.DEFAULT_SORT_NAME;
    // this.selectedGenre = ZORG_CONSTANTS.GENRE_TOUS;
    this.updateMoviesList();
    // this.getNewMovies();
  }

  showLoading() {
    this.loader = this.loadingController.create({
      content: "Chargement en cours..."
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  // doInfinite(): Promise<Movie[]> {
  //   this.pageIndex++;
  //   console.info("doInfinite", this.pageIndex);
  //   return this.zorglobMovieService.getMovies(this.pageSize, this.pageIndex);
  // }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.updateMoviesList(infiniteScroll);
    // if (this.searchText && this.searchText.length > 0) {
    //   this.zorglobMovieService.getMoviesFromTitle(this.searchText, this.pageSize, this.pageIndex).then((value) => {
    //     this.movies = this.movies.concat(value);
    //     infiniteScroll.complete();

    //     if (!value || value.length == 0) {
    //       infiniteScroll.enable(false);
    //     }
    //     this.hideLoading();
    //   });
    // }
    // else {
    //   this.zorglobMovieService.getMovies(this.pageSize, this.pageIndex).then((value) => {
    //     this.movies = this.movies.concat(value);
    //     infiniteScroll.complete();

    //     if (!value || value.length == 0) {
    //       infiniteScroll.enable(false);
    //     }
    //     this.hideLoading();
    //   });
    // }

  }

  onSearchByKeyword(event: any) {
    this.showLoading();
    this.pageIndex = 0;
    this.zorglobMovieService.getMoviesFromTitle(this.searchText, this.pageSize, this.pageIndex).then((value) => {
      this.movies = value;
      this.hideLoading();
    });
  }

  // getNewMovies() {
  //   this.newMovies = [];
  //   this.lastDate = moment(localStorage.getItem(ZORG_CONSTANTS.PREC_DATE), "DD/MM/YYYY").toDate();
  //   this.zorglobMovieService.getNewMovies(this.pageSize, this.pageIndex, this.lastDate.toDateString()).then((value) => {
  //     this.newMovies = value;
  //   });
  // }

  updateMoviesList(infiniteScroll?: InfiniteScroll) {
    this.showLoading();
    this.pageSize = 100;

    if (infiniteScroll) {
      this.pageIndex++;
    }
    else {
      this.pageIndex = 0;      
      this.movies = [];
    }

    if (this.searchText && this.searchText.length > 0) {
      this.zorglobMovieService.getMoviesFromTitle(this.searchText, this.pageSize, this.pageIndex).then((value) => {
        if (infiniteScroll) {
          this.movies = this.movies.concat(value);
          infiniteScroll.complete();

          if (!value || value.length == 0) {
            infiniteScroll.enable(false);
          }
        }
        else {
          this.movies = value;
        }
        this.hideLoading();
      }).catch((error) => {
        this.goToErrorPage();
      });
    }
    else {
      if (this.selectedGenre == ZORG_CONSTANTS.GENRE_TOUS) {
        //On tri par ordre croissant uniquement pour les Titres
        this.zorglobMovieService.getMoviesSorted(this.pageSize, this.pageIndex, this.selectedSortName, this.selectedSortName == ZORG_CONSTANTS.SORT_TITRE_VALUE).then((value) => {
          this.addMoviesToMoviesList(value, infiniteScroll);
        }).catch((error) => {
          this.goToErrorPage();
        });
      } else {
        this.zorglobMovieService.getMoviesFromGenre(this.selectedGenre, this.pageSize, this.pageIndex, this.selectedSortName, this.selectedSortName == ZORG_CONSTANTS.SORT_TITRE_VALUE).then((value) => {
          this.addMoviesToMoviesList(value, infiniteScroll);
        }).catch((error) => {
          this.goToErrorPage();
        });
      }
    }
  }

  addMoviesToMoviesList(value: any, infiniteScroll?: InfiniteScroll){
    if (infiniteScroll) {
      this.movies = this.movies.concat(value);
      infiniteScroll.complete();

      if (!value || value.length == 0) {
        infiniteScroll.enable(false);
      }
    }
    else {
      this.movies = value;
    }
    this.hideLoading();
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuComponent);
    popover.present({
      ev: myEvent
    });
  }

  detailFilm(movie: Movie) {
    this.navCtrl.push(DetailFilmPage, { movie });
  }

  sort(myEvent) {
    this.zorglobConfigService.getSortNames().then((value) => {
      this.sortNames = value;
      console.info("this.sortNames", this.selectedSortName);
      let popover = this.popoverCtrl.create(PopoverMenuComponent, { items: this.sortNames, titre: "Trier par :", selected: this.selectedSortName });
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss((item) => {
        if (item) {
          this.selectedSortName = item.Value;
          this.updateMoviesList();
        }
      });
    });
  }

  filter(myEvent) {
    this.zorglobConfigService.getGenres().then((value) => {
      this.genres = value;
      this.genres.unshift({
        Id: 0,
        Value: "Tous"
      });

      let popover = this.popoverCtrl.create(PopoverMenuComponent, { items: this.genres, titre: "Filtrer sur le genre :", selected: this.selectedGenre });
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss((item) => {
        if (item) {
          this.selectedGenre = item.Value;
          this.updateMoviesList();
        }
      });
    });
  }

  toggleSearchText(value:boolean){
    this.displaySearchText = value;
    if(!value){
      this.searchText = "";
      this.updateMoviesList();
    }
  }

  goToErrorPage(){
    this.hideLoading();
    this.navCtrl.push(ErrorPage);
  }
}