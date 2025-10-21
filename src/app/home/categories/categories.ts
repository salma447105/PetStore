import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.html',
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  startIndex = 0;
  visibleCount = 4;
  loading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.loading = false;
      },
    });
  }

  next(): void {
    if (this.startIndex + this.visibleCount < this.categories.length) {
      this.startIndex++;
    }
  }

  prev(): void {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  get visibleCategories() {
    return this.categories.slice(this.startIndex, this.startIndex + this.visibleCount);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
