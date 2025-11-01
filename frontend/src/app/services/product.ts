import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private apiUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`).pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]);
      })
    );
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products?categoryId=${categoryId}`).pipe(
      catchError(error => {
        console.error('Error fetching products by category:', error);
        return of([]);
      })
    );
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return of([]);
      })
    );
  }
getProductsByPet(petId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/products?petId=${petId}`).pipe(
    catchError(error => {
      console.error('Error fetching products by pet:', error);
      return of([]);
    })
  );
}

  getPets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pets`).pipe(
      catchError(error => {
        console.error('Error fetching pets:', error);
        return of([]);
      })
    );
  }

  getProductById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/products/${id}`).pipe(
    catchError(error => {
      console.error('Error fetching product:', error);
      return of(null);
    })
  );
}




}
