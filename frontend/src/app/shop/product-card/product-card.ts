import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites';
import { ToastService } from '../../services/toast';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

interface Product {
  id: number;
  name: string;
  description?: string;
  shortDesc?: string;
  price: number;
  image?: string;
  numberInStock: number;
  rating: number;
}

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
    private favoritesService: FavoritesService,
    private toastService: ToastService,
    private cartService: CartService,
    private authService: AuthService
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
  
    // Show toast notification
    if (this.isFavorite) {
      this.toastService.show('Product added to favorites!', 'success');
    } else {
      this.toastService.show('Product removed from favorites!', 'info');
    }

  }

  async addToCart(event: Event) {
    event.stopPropagation(); // Prevent navigation
    
    try {
      // Check if user is logged in
      const user = await this.authService.getCurrentUser();
      if (!user) {
        this.toastService.show('Please log in to add items to cart', 'error');
        this.router.navigate(['/login']);
        return;
      }

      if (this.product.numberInStock <= 0) {
        this.toastService.show('Sorry, this item is out of stock', 'error');
        return;
      }

      await this.cartService.addToCart({
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        image: this.product.image
      });
      
      this.toastService.show('Added to cart successfully!', 'success');
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.toastService.show('Failed to add item to cart', 'error');
    }
  }
}
