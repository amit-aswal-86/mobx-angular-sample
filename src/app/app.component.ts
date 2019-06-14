import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Mobx Sample';

  constructor(public heroService: HeroService) {}

  ngOnInit() {
    console.log('ngOnInit >>>>>');
    this.heroService.fetchHeros();
  }

  onSelect(hero) {
    console.log('Hero Selected >>>>>' + JSON.stringify(hero));
  }

  addHero(heroName) {
    this.heroService.addHero(heroName);
  }

  private fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(HEROES), 5000);
    });
  }
}
