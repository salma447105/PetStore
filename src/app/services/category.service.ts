import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  image?: string;
  productCount?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<any>('assets/db.json').pipe(
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
    );
  }
}
