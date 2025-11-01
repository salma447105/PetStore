import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.html',
})
export class CategoriesComponent implements OnInit {
  startIndex = signal(0);
  visibleCount = 4;
  loading = signal(true);

  categories = signal<any[]>([]);
  visibleCategories = computed(() =>
    this.categories().slice(this.startIndex(), this.startIndex() + this.visibleCount)
  );

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe((data) => {
      this.categories.set(data);
      this.loading.set(false);
    });
  }

  next(): void {
    if (this.startIndex() + this.visibleCount < this.categories().length) {
      this.startIndex.set(this.startIndex() + 1);
    }
  }

  prev(): void {
    if (this.startIndex() > 0) {
      this.startIndex.set(this.startIndex() - 1);
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  onCategoryClick(cat: any): void {
    this.router.navigate(['/category', cat.id]);
  }
}
