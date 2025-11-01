import { Component } from '@angular/core';
// import { Hero } from '../home/hero/hero';
// import { Footer } from '../footer/footer';
// import { ShopByPet } from '../home/shop-by-pet/shop-by-pet';
import { Filter } from './filter/filter';
import { ProductCard } from './product-card/product-card';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product';
import { ShopHero } from './shop-hero/shop-hero';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, ShopHero, Filter, ProductCard],
  templateUrl: './shop.html',
  styles: ``
})
export class Shop {
  products: any[] = [];
  filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  sortBy: string = 'latest';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.applySorting();
    });
  }

  onFilterChange(filters: any) {
    console.log('Applied filters:', filters);
    console.log('Total products:', this.products.length);

    const petFilter = filters.pets;
    const editedPetsFilters = petFilter.map((num: string | number) => +num);

    const categoryFilter = filters.categories;
    const editedCategoryFilters = categoryFilter.map((num: string | number) => +num);

    console.log(filters.priceRange);
    console.log(filters.rating);

    this.filteredProducts = this.products.filter(product => {
      let matches = true;

      // Filter by pets
      if (filters.pets.length > 0) {
        matches = matches && editedPetsFilters.includes(product.petId);
      }

      // Filter by categories
      if (filters.categories.length > 0) {
        matches = matches && editedCategoryFilters.includes(product.categoryId);
      }

      // Filter by price
      matches = matches && (product.price >= filters.priceRange.min && product.price <= filters.priceRange.max);

      // Filter by rating
      if (filters.rating !== 0) {
        console.log('Rating filter applied:', filters.rating);
        switch (filters.rating) {
          case 1:
            matches = matches && (product.rating < 2 && product.rating >= 1);
            break;
          case 2:
            matches = matches && (product.rating < 3 && product.rating >= 2);
            break;
          case 3:
            matches = matches && (product.rating < 4 && product.rating >= 3);
            break;
          case 4:
            matches = matches && (product.rating < 5 && product.rating >= 4);
            break;
          case 5:
            matches = matches && (product.rating === 5);
            break;
        }
      }

      // Filter by availability
      if (filters.availability !== 'all') {
        switch (filters.availability) {
          case 'instock':
            matches = matches && (product.numberInStock > 5);
            break;
          case 'lowstock':
            matches = matches && (product.numberInStock > 0 && product.numberInStock <= 5);
            break;
          case 'outofstock':
            matches = matches && (product.numberInStock === 0);
            break;
        }
      }

      return matches;
    });

    this.applySorting();
    this.currentPage = 1;
    console.log('Filtered products:', this.filteredProducts.length);
  }


 
  
  /** Sorting methods */
  onSortChange(sortType: string) {
    this.sortBy = sortType;
    this.applySorting();
  }
  
  applySorting() {
    switch (this.sortBy) {
      case 'price-low-high':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-low-high':
        this.filteredProducts.sort((a, b) => a.rating - b.rating);
        break;
      case 'rating-high-low':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'stock-low-high':
        this.filteredProducts.sort((a, b) => a.numberInStock - b.numberInStock);
        break;
      case 'stock-high-low':
        this.filteredProducts.sort((a, b) => b.numberInStock - a.numberInStock);
        break;
      case 'latest':
      default:
        // Sort by ID (assuming higher ID = newer)
        this.filteredProducts.sort((a, b) => b.id - a.id);
        break;
    }
  }


  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
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