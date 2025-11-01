import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product';
import { FavoritesService } from '../services/favorites'; 
import { ToastService } from '../services/toast'; 

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styles: ``
})
export class ProductDetails implements OnInit{


  product: any = null;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private favoritesService: FavoritesService,
    private toastService: ToastService


  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Loading product with ID:', productId);
    this.loadProduct(productId);

    this.favoritesService.getFavoritesObservable().subscribe(favorites => {
      if (this.product) {
        this.isFavorite = favorites.includes(this.product.id);
      }
    });

  }

  private loadProduct(productId: number) {
    this.productService.getProductById(productId).subscribe(product => {
      console.log('Product loaded:', product);
      this.product = product;
      this.isFavorite = this.favoritesService.isFavorite(product.id);
    });
  }

  goBack() {
    this.router.navigate(['/shop']);
  }

  addToCart() {
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
    
    // Show toast notification
    this.toastService.show('Product added to cart!', 'success');
    console.log('Added to cart:', this.product);

  }

  toggleFavorite(event: Event) {
    const wasFavorite = this.isFavorite;
    this.favoritesService.toggleFavorite(this.product.id);
  
     // Show toast notification
    if (wasFavorite) {
      this.toastService.show('Product removed from favorites!', 'info');
    } else {
      this.toastService.show('Product added to favorites!', 'success');
    }
  
  }
}











