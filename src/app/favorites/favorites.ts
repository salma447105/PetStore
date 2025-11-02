// favorites.ts (component)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../services/favorites';
import { ProductService } from '../services/product';
import { ProductCard } from '../shop/product-card/product-card';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, RouterModule, ProductCard],
  templateUrl: './favorites.html',
  styles: ``
})
export class Favorites implements OnInit {
  favoriteProducts: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadFavoriteProducts();
    
    // Subscribe to favorites changes
    this.favoritesService.getFavoritesObservable().subscribe(() => {
      this.loadFavoriteProducts();
    });
  }

  private loadFavoriteProducts() {
    const favoriteIds = this.favoritesService.getFavorites();
    this.favoriteProducts = [];
    
    favoriteIds.forEach(id => {
      this.productService.getProductById(id).subscribe(product => {
        if (product && !this.favoriteProducts.find(p => p.id === product.id)) {
          this.favoriteProducts.push(product);
        }
      });
    });
  }
}
