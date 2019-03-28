import { ZorglobConfigService } from './zorglobConfigService';
import { Movie } from './../dto/Movie';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as ZORG_CONSTANTS from '../constants';

import 'rxjs/Rx';

@Injectable()
export class ZorglobAdminService {
    private adminUrl: string;
    //private adminUrl = 'http://gorglob.synology.me:91/api/movies'; //URL to web api
    //private adminUrl = 'http://localhost:925/api/movies'; //URL to web api
    //private adminUrl = 'http://localhost:57685/api/movies'; //URL to web api
    //private adminUrl = 'http://gorglob.synology.me:88/GetStuff/api/films'; //URL to web api
    //private adminUrl = 'http://localhost:57685/api/movies'
    //private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private zorglobConfigService: ZorglobConfigService) {
        //window.location.hostname.indexOf("int-maestro")        
        this.adminUrl = this.zorglobConfigService.getApiUrl("admin");
        //console.info("HOST", this.adminUrl);        
    }


    checkPassword(password: string): Promise<boolean> {
        return this.http.get(this.adminUrl + "/checkpassword", {
            params: {
                password
            }
        }).toPromise()
            .then(response => response.json() as boolean);
    }

    updateBdd(password: string): Promise<string> {
        return this.http.get(this.adminUrl + "/updatebdd", {
            params: {
                password
            }
        }).toPromise()
            .then(response => response.json() as string);
    }

    getUnfoundMovies(password: string): Promise<Movie[]> {
        return this.http.get(this.adminUrl + "/getUnfoundMovies", {
            params: {
                password
            }
        }).toPromise()
            .then(response => response.json() as Movie[]);
    }

    getSearchResult(password: string, movieTitle: string): Promise<Movie[]> {
        return this.http.get(this.adminUrl, {
            params: {
                password,
                movieTitle
            }
        }).toPromise()
            .then(response => response.json().results as Movie[]);
    }

    updateMovie(password: string, movieIdToUpdate: number, tmdbMovieId: number): Promise<boolean> {
        return this.http.get(this.adminUrl + "/updateunfoundmovie", {
            params: {
                movieIdToUpdate,
                tmdbMovieId,
                password
            }
        }).toPromise()
            .then(response => response.json() as boolean);
    }

    getDoublons(password: string): Promise<any[]> {
        return this.http.get(this.adminUrl + "/doublons", {
            params: {
                password
            }
        }).toPromise()
            .then(response => response.json() as any[]);
    }

    deleteDoublon(password: string, path: string): Promise<boolean> {
        return this.http.get(this.adminUrl + "/deletedoublon", {
            params: {
                password,
                path
            }
        }).toPromise()
            .then(response => response.json() as boolean);
    }

    setAdminMode(adminMode: boolean) {
        if (adminMode)
            localStorage.setItem(ZORG_CONSTANTS.ADMIN_MODE, JSON.stringify(adminMode));
        else
            localStorage.removeItem(ZORG_CONSTANTS.ADMIN_MODE);
    }

    setPassword(password: string) {
        if (password && password.length > 0)
            localStorage.setItem(ZORG_CONSTANTS.ADMIN_PWD, JSON.stringify(password));
        else
            localStorage.removeItem(ZORG_CONSTANTS.ADMIN_PWD);
    }
}