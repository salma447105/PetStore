import { Component , OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']  
})
  
export class Navbar implements OnInit {

  favoritesCount: number = 0;
  constructor(private favoritesService: FavoritesService) {} 

  ngOnInit() {
      this.favoritesCount = this.favoritesService.getFavoritesCount();
      this.favoritesService.getFavoritesObservable().subscribe(favorites => {
      this.favoritesCount = favorites.length;
    });
  }
}
