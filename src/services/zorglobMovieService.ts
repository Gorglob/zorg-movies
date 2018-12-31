import { ZorglobConfigService } from './zorglobConfigService';
import { Movie } from './../dto/Movie';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';

// import { Movie } from '../dto/movie';
// import { MOVIES } from '../mockfiles/movies.mock';

@Injectable()
export class ZorglobMovieService {
    private moviessUrl: string;
    //private moviessUrl: string;
    //private moviessUrl = 'http://gorglob.synology.me:91/api/movies'; //URL to web api
    //private moviessUrl = 'http://localhost:925/api/movies'; //URL to web api
    //private moviessUrl = 'http://localhost:57685/api/movies'; //URL to web api
    //private moviessUrl = 'http://gorglob.synology.me:88/GetStuff/api/films'; //URL to web api
    //private moviessUrl = 'http://localhost:57685/api/movies'
    //private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private zorglobConfigService:ZorglobConfigService) { 
        //window.location.hostname.indexOf("int-maestro")        
        //console.info("HOST", this.moviessUrl);
        this.moviessUrl = zorglobConfigService.getApiUrl("movies");
    }

    getMovies(pageSize: number, pageIndex: number):Promise<Movie[]>{
        return this.http.get(this.moviessUrl, {
            params: {
                pageSize,
                pageIndex
            }
        }).toPromise()
        .then(response => response.json() as Movie[]);
    }

    getMoviesFromTitle(title: string, pageSize: number, pageIndex: number):Promise<Movie[]>{
        return this.http.get(this.moviessUrl, {
            params: {
                pageSize,
                pageIndex,
                title
            }
        }).toPromise()
        .then(response => response.json() as Movie[]);
    }

    getMoviesFromPerson(person: string, pageSize: number, pageIndex: number):Promise<Movie[]>{
        return this.http.get(this.moviessUrl, {
            params: {
                pageSize,
                pageIndex,
                person
            }
        }).toPromise()
        .then(response => response.json() as Movie[]);
    }

    getMoviesFromGenre(genre: string, pageSize: number, pageIndex: number, sortName: string, asc: boolean):Promise<Movie[]>{
        return this.http.get(this.moviessUrl + "/genre", {
            params: {
                pageSize,
                pageIndex,
                genre,
                sortName,
                asc
            }
        }).toPromise()
        .then(response => response.json() as Movie[]);
    }

    getMoviesSorted(pageSize: number, pageIndex: number, sortName: string, asc: boolean):Promise<Movie[]>{
        console.info("getMoviesSorted");
        return this.http.get(this.moviessUrl, {
            params: {
                pageSize,
                pageIndex,
                sortName,
                asc
            }
        }).toPromise()
        .then(response => response.json() as Movie[]);
    }

    getNewMovies(pageSize: number, pageIndex: number, lastDate: string):Promise<Movie[]>{
        return this.http.get(this.moviessUrl, {
            params: {
                pageSize,
                pageIndex,
                lastDate
            }
        }).toPromise()
        .then(response => response.json() as Movie[]);
    }
    /*getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getHeroes());
    }*/

    /*getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }*/
}