import { Component, OnInit, effect, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})

export class Navbar implements OnInit {
  favoritesCount: number = 0;
  cartItemCount: number = 0;

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) {
    // Set up cart count effect in constructor
    effect(() => {
      const count = this.cartService.getItemCount();
      console.log('Cart count updated:', count);
      this.cartItemCount = count;
    });
  }

  ngOnInit() {
    // Initialize favorites count
    this.favoritesCount = this.favoritesService.getFavoritesCount();
    this.favoritesService.getFavoritesObservable().subscribe(favorites => {
      this.favoritesCount = favorites.length;
    });
  }
}
