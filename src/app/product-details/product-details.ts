import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product';
import { FavoritesService } from '../services/favorites'; 
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
    private favoritesService: FavoritesService 

  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Loading product with ID:', productId);
    this.loadProduct(productId);
    this.checkFavoriteStatus(productId);

    this.favoritesService.getFavoritesObservable().subscribe(favorites => {
      this.isFavorite = favorites.includes(productId);
    });

  }

  private loadProduct(productId: number) {
    this.productService.getProductById(productId).subscribe(product => {
      console.log('Product loaded:', product);
      this.product = product;
    });
  }

  private checkFavoriteStatus(productId: number) {
    // Check if product is in favorites 
    this.isFavorite = this.favoritesService.isFavorite(productId);

    // const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // this.isFavorite = favorites.includes(productId);
  }

  goBack() {
    this.router.navigate(['/shop']);
  }

  addToCart() {
    // Add to cart functionality 
    console.log('Added to cart:', this.product);
  }

  toggleFavorite() {
    this.favoritesService.toggleFavorite(this.product.id);  }
}











