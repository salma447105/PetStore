import { Component } from '@angular/core';
import { Hero } from '../home/hero/hero';
import { ShopByPet } from './shop-by-pet/shop-by-pet';
import { Filter } from './filter/filter';
import { ProductCard } from './product-card/product-card';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, Hero, ShopByPet, Filter, ProductCard],
  templateUrl: './shop.html',
  styles: ``
})
export class Shop {
  products: any[] = [];
  // filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 12;
  sortBy: string = 'latest';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      // this.filteredProducts = products;
      this.applySorting();
    });
  }

  // onFilterChange(filters: any) {
  //   console.log('Applied filters:', filters);
  //   console.log('Total products:', this.products.length);

  //   const petFilter = filters.pets;
  //   const editedPetsFilters = petFilter.map((num: string | number) => +num);
  //   //  console.log('Edited filters:', editedPetsFilters);
     
  //   const categoryFilter = filters.categories;
  //   const editedCategoryFilters = categoryFilter.map((num: string | number) => +num);
  //   //  console.log('Edited category filters:', editedCategoryFilters);

  //   console.log(filters.priceRange);
  //   console.log(filters.rating);
     
  //   this.filteredProducts = this.products.filter(product => {
  //     // Filter by pets
  //     if (filters.pets.length > 0 && editedPetsFilters.includes(product.petId)) {
  //       console.log('passed product', product);
  //       return true;
  //     }
  //     // Filter by categories
  //     if (filters.categories.length > 0 && editedCategoryFilters.includes(product.categoryId)) {
  //       return true;
  //     }

  //     // Filter by price
  //     if (product.price >= filters.priceRange.min && product.price <= filters.priceRange.max) {
  //       console.log('passed product');
  //       return true;
  //     }

  //     // console.log('Rating filter applied:', filters.rating.toString());
  //     // Filter by rating
  //     if (filters.rating.value !== 0) {
  //       console.log('Rating filter applied:', filters.rating);
  //       switch (filters.rating) {
  //         case 1:
  //           if (product.rating < 2 && product.rating >= 1) return true;
  //           break;
  //         case 2:
  //           if (product.rating < 3 && product.rating >= 2) return true;
  //           break;
  //         case 3:
  //           if (product.rating < 4 && product.rating >= 3) return true;
  //           break;
  //         case 4:
  //           if (product.rating < 5 && product.rating >= 4) return true;
  //           break;
  //         case 5:
  //           if (product.rating === 5) return true;
  //           break;
  //       }
  //     }
  //     // Filter by availability
  //     if (filters.availability !== 'all') {
  //       switch (filters.availability) {
  //         case 'instock':
  //           if (product.numberInStock > 5) return true;
  //           break;
  //         case 'lowstock':
  //           if (product.numberInStock > 0 && product.numberInStock <= 5) return true;
  //           break;
  //         case 'outofstock':
  //           if (product.numberInStock == 0) return true;
  //           break;
  //       }

  //     }

  //     return false;
  //   });
  //   this.applySorting();
  //   this.currentPage = 1;
  //   console.log('Filtered products:', this.filteredProducts.length);
  // }


 
  
  /** Sorting methods */
  onSortChange(sortType: string) {
    this.sortBy = sortType;
    this.applySorting();
  }
  
  applySorting() {
    switch (this.sortBy) {
      case 'price-low-high':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case 'rating-low-high':
        this.products.sort((a, b) => a.rating - b.rating);
        break;
      case 'rating-high-low':
        this.products.sort((a, b) => b.rating - a.rating);
        break;
      case 'stock-low-high':
        this.products.sort((a, b) => a.numberInStock - b.numberInStock);
        break;
      case 'stock-high-low':
        this.products.sort((a, b) => b.numberInStock - a.numberInStock);
        break;
      case 'latest':
      default:
        // Sort by ID (assuming higher ID = newer)
      this.products.sort((a, b) => b.id - a.id);
      break;
    }
  }


  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }


}