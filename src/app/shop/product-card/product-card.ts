import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites';
@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styles: ``
})
export class ProductCard implements OnInit {
  @Input() product: any;
  
  isFavorite: boolean = false;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    // console.log(this.product);
    // Check if product is in favorites using the service
    this.isFavorite = this.favoritesService.isFavorite(this.product.id);
    // Subscribe to favorites changes
    this.favoritesService.getFavoritesObservable().subscribe(favorites => {
      this.isFavorite = favorites.includes(this.product.id);
    });
  }

  navigateToProduct() {
    this.router.navigate(['/product', this.product.id]);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation(); // Prevent navigation when clicking favorite
    this.favoritesService.toggleFavorite(this.product.id);
    
    // Update favorites in localStorage
    // let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // if (this.isFavorite) {
    //   if (!favorites.includes(this.product.id)) {
    //     favorites.push(this.product.id);
    //   }
    // } else {
    //   favorites = favorites.filter((id: number) => id !== this.product.id);
    // }
    
    // localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  addToCart(event: Event) {
    event.stopPropagation(); // Prevent navigation when clicking add to cart
    
    // Add to cart functionality
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === this.product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...this.product,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Added to cart:', this.product.name);
  }
}
