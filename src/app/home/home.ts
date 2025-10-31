import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { CategoriesComponent } from './categories/categories';
import { NewsBlog } from './news-blog/news-blog';
import { Ad } from './ad/ad';
import { ShopByPet } from "./shop-by-pet/shop-by-pet";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, CategoriesComponent, Ad, ShopByPet, NewsBlog, ShopByPet],
templateUrl: './home.html',
})
export class Home {}
