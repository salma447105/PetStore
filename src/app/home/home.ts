import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { CategoriesComponent } from './categories/categories';

import { NewsBlog } from './news-blog/news-blog';
import { Ad } from './ad/ad';
import { ShopByPetsComponent } from './agogogaga/go';
// import { ShopByPetsComponent } from './agogogaga/go';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, CategoriesComponent, Ad, ShopByPetsComponent, NewsBlog, ], //ShopByPetsComponent
templateUrl: './home.html',
})
export class Home {}
