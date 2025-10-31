import { Component } from '@angular/core';
import { Hero } from '../home/hero/hero';
import { Footer } from '../footer/footer';
// import { ShopByPet } from '../home/shop-by-pet/shop-by-pet';
import { Filter } from './filter/filter';
import { ProductCard } from './product-card/product-card';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, Hero, Filter, ProductCard],
  templateUrl: './shop.html',
  styles: ``
})
export class Shop {
  products: any[] = [];
  filteredProducts: any[] = [];


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

   onFilterChange(filters: any) {
    console.log('Applied filters:', filters);
    console.log('Total products:', this.products.length);


    this.filteredProducts = this.products.filter(product => {
      // Filter by categories
      if (filters.categories.length > 0 && !filters.categories.includes(product.categoryId)) {
        return false;
      }

      // Filter by pets
      if (filters.pets.length > 0 && !filters.pets.includes(product.petId)) {
        return false;
      }

      // Filter by price
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      // Filter by rating
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // Filter by availability
      if (filters.availability !== 'all') {
        switch (filters.availability) {
          case 'instock':
            if (product.numberInStock <= 0) return false;
            break;
          case 'lowstock':
            if (product.numberInStock <= 0 || product.numberInStock > 5) return false;
            break;
          case 'outofstock':
            if (product.numberInStock > 0) return false;
            break;
        }
      }

      return true;
    });
    console.log('Filtered products:', this.filteredProducts.length);
  }
}
