import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html',
})
export class CategoryListComponent implements OnInit {
  products: any[] = [];
  categoryId!: number;
  categoryName = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = Number(params.get('id'));
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProductsByCategory(this.categoryId).subscribe((data) => {
      this.products = data;
      if (data.length > 0) {
        this.categoryName = data[0].categoryName || 'Category';
      }
    });
  }

  goToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
