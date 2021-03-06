import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HeroService]
})
export class HomeComponent implements OnInit {
  heroes;
  folders;
  notes;
  res;
  title = 'Heroes List!';
  constructor(
    private HeroService: HeroService
  ){}
  
  getHeroes(): void{//函数
    this.HeroService.getHeroes().then(heroes => this.heroes = heroes);//接受promise
  }

  ngOnInit() {
    // this.http.get('/api/app/info/11?sign=beb790d872f5b20202c7d4e98119c54d&timeout=5000')
    //   .switchMap(res => res.text())
    //   .subscribe(response => this.res = response);
    this.getHeroes();//调用函数
    //onselect(hero: Hero): void {}
    this.folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  this.notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  }

}
