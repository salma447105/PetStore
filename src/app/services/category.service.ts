import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  image?: string;
  productCount?: number;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  categories = signal<Category[]>([]);
  selectedCategory = signal<Category | null>(null);

  constructor(private http: HttpClient) {}

  fetchCategories() {
    this.http.get<any>('../../../db.json').pipe(
      map((data) => {
        const db = data;
        const products = db.products || [];

        return (db.categories || []).map((cat: any) => ({
          ...cat,
          image:
            products.find((p: any) => p.categoryId === cat.id)?.image ||
            'https://via.placeholder.com/300x200',
          productCount: products.filter((p: any) => p.categoryId === cat.id).length,
        }));
      })
    ).subscribe((data) => this.categories.set(data));
  }

  setSelectedCategory(cat: Category) {
    this.selectedCategory.set(cat);
  }

  getCategoryById(id: number): Category | undefined {
    return this.categories().find(c => c.id === id);
  }
}
