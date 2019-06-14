import { Injectable } from '@angular/core';
import { observable, action, computed, runInAction, configure } from 'mobx';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

configure({ enforceActions: 'observed' }); // don't allow state modifications outside actions

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  @observable heroArray: Hero[] = [];

  constructor() {
  }

  @computed get totalHero(): number {
    return this.heroArray.length;
  }

  findHero(str): Hero[] {
    const regex = new RegExp(str, 'i');
    return this.heroArray.filter((heroObj) => {
     return heroObj.name.toLowerCase().search(regex) >= 0;
    });
  }

  @action addHeroArray(heroArray: Hero[]): void {
    this.heroArray = [...heroArray];
  }

  @action addHero(name: String): void {
    let id = 1;
    if (this.heroArray.length >= 1) {
      id = this.heroArray[(this.heroArray.length - 1)].id + 1;
    }

    const newHero: Hero = { id, name } as Hero;
    this.heroArray.push(newHero);
  }

  @action fetchHeros() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(HEROES), 5000);
    });
    promise.then((data) => {
      runInAction(() => {
        this.heroArray = data;
      });
      console.log('HeroArray >>> ' + JSON.stringify(this.heroArray));
    });
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
