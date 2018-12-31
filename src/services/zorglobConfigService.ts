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
    private ApiUrl: string;
    //private ApiUrl = 'http://localhost:57685/api/movies'; //URL to web api
    //private ApiUrl = 'http://gorglob.synology.me:88/GetStuff/api/films'; //URL to web api
    //private ApiUrl = 'http://localhost:57685/api/movies'
    //private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
    }

    getGenres(): Promise<DescriptionItem[]> {
        console.info("getGenres");
        if (!localStorage.getItem(ZORG_CONSTANTS.LIST_GENRES)) {
            return this.http.get(this.getApiUrl("config") + "/genres", {
            }).toPromise()
                .then(
                    (response) => {
                        console.info("getGenres FINISH");
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
        console.info("getSortNames");
        if (!localStorage.getItem(ZORG_CONSTANTS.LIST_SORTNAMES)) {
            return this.http.get(this.getApiUrl("config") + "/sortnames", {
            }).toPromise()
                .then(
                    (response) => {
                        console.info("getSortNames FINISH");
                        localStorage.setItem(ZORG_CONSTANTS.LIST_SORTNAMES, JSON.stringify(response.json() as DescriptionItem[]));
                        return response.json() as DescriptionItem[]
                    }
                );
        }
        else {
            return Promise.resolve(JSON.parse(localStorage.getItem(ZORG_CONSTANTS.LIST_SORTNAMES)) as DescriptionItem[]);
        }
    }

    getApiUrl(apiType : string) {
        switch (apiType) {
            case "config":
                return this.ApiUrl + "/api/admin";                
            default:
                return this.ApiUrl + "/api/movies";
        }
    }

    initApiUrls(): Promise<boolean> {
        //On détermine s'il faut appeler l'ulr local ou distante (utile quand on est en local à la maison)
        let urlTest1: string = 'http://gorglob.synology.me:91'; //URL to web api
        let urlTest2: string = 'http://zorg-serv2012:925'; //URL to web api
        
        if(localStorage.getItem(ZORG_CONSTANTS.DEFAULT_API_URL)) {
            this.ApiUrl = localStorage.getItem(ZORG_CONSTANTS.DEFAULT_API_URL);
            return Promise.resolve(true);
        }
        else {
            return this.http.get(urlTest1).toPromise().then(
                (response) => {
                    this.ApiUrl = urlTest1;
                    localStorage.setItem(ZORG_CONSTANTS.DEFAULT_API_URL, urlTest1);
                    return response.ok;
                }
            ).catch((error) => {
                return this.http.get(urlTest2).toPromise().then(
                    (response) => {
                        this.ApiUrl = urlTest2;
                        localStorage.setItem(ZORG_CONSTANTS.DEFAULT_API_URL, urlTest2);
                        return response.ok;
                    }).catch((error) => {
                        return false;
                    });
            });
        }
    }
}