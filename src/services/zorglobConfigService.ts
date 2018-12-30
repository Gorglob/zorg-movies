import { DescriptionItem } from './../dto/DescriptionItem';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as ZORG_CONSTANTS from '../constants';

import 'rxjs/Rx';

// import { Movie } from '../dto/movie';
// import { MOVIES } from '../mockfiles/movies.mock';

@Injectable()
export class ZorglobConfigService {
    //private ApiUrl = 'http://zorg-serv2012:925/api/admin'; //URL to web api
    private ApiUrl = (window.location.hostname.indexOf("gorglob") === -1 ? 'http://zorg-serv2012:925' : 'http://gorglob.synology.me:91') + '/api/admin'; //URL to web api
    //private ApiUrl = 'http://localhost:57685/api/movies'; //URL to web api
    //private ApiUrl = 'http://gorglob.synology.me:88/GetStuff/api/films'; //URL to web api
    //private ApiUrl = 'http://localhost:57685/api/movies'
    //private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { 
    }

    getGenres(): Promise<DescriptionItem[]> {
        if (!localStorage.getItem(ZORG_CONSTANTS.LIST_GENRES)) {
            return this.http.get(this.ApiUrl + "/genres", {
            }).toPromise()
                .then(
                    (response) => {
                        localStorage.setItem(ZORG_CONSTANTS.LIST_GENRES, JSON.stringify(response.json() as DescriptionItem[]));
                        return response.json() as DescriptionItem[]
                    }
                );
        }
        else {
            return Promise.resolve(JSON.parse(localStorage.getItem(ZORG_CONSTANTS.LIST_GENRES)) as DescriptionItem[]);
        }
    }

    getSortNames(): Promise<DescriptionItem[]> {
        if (!localStorage.getItem(ZORG_CONSTANTS.LIST_SORTNAMES)) {
            return this.http.get(this.ApiUrl + "/sortnames", {
            }).toPromise()
                .then(
                    (response) => {
                        localStorage.setItem(ZORG_CONSTANTS.LIST_SORTNAMES, JSON.stringify(response.json() as DescriptionItem[]));
                        return response.json() as DescriptionItem[]
                    }
                );
        }
        else {
            return Promise.resolve(JSON.parse(localStorage.getItem(ZORG_CONSTANTS.LIST_SORTNAMES)) as DescriptionItem[]);
        }
    }    
}