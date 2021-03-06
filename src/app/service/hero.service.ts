import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../class/hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';  // URL to web api
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
  };
  testGet(): Promise<any>{
    return this.http.get('http://scmpurchase.loongjoy.com/api/purchaseParts/getList?fromSys=scmpcapp&lang=zh&pageIndex=1&pageSize=10&token=06dcc3580eaaa25a045b6559f8c0509e')
      .map(response =>{
        return response.json().data;
      })
      .toPromise()
  };
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 1000)
    ) // delay 2 seconds
    .then(() => this.getHeroes());
  };
  getHero(id: number): Promise<Hero>{
    return this.getHeroes()
    .then(heroes => heroes.find(hero => hero.id === id));
  }
}
