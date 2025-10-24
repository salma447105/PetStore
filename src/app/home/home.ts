import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { CategoriesComponent } from './categories/categories';
// import { Footer } from './footer/footer';
import { NewsBlog } from './news-blog/news-blog';
// import { ShopByPetsComponent } from "./shop-by-pets/shop-by-pets";
import { Ad } from './ad/ad';
import { ShopByPetsComponent } from './shop-by-pets/shop-by-pets';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, CategoriesComponent, Ad, ShopByPetsComponent, NewsBlog, ], //ShopByPetsComponent
templateUrl: './home.html',
})
export class Home {}
