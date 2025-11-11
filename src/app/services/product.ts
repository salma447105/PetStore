import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.dbUrl}/products`).pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]);
      })
    );
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.dbUrl}/products?categoryId=${categoryId}`).pipe(
      catchError(error => {
        console.error('Error fetching products by category:', error);
        return of([]);
      })
    );
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.dbUrl}/categories`).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return of([]);
      })
    );
  }
getProductsByPet(petId: number): Observable<any[]> {
  return this.http.get<any[]>(`${environment.dbUrl}/products?petId=${petId}`).pipe(
    catchError(error => {
      console.error('Error fetching products by pet:', error);
      return of([]);
    })
  );
}

  getPets(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.dbUrl}/pets`).pipe(
      catchError(error => {
        console.error('Error fetching pets:', error);
        return of([]);
      })
    );
  }

  getProductById(id: number): Observable<any> {
  return this.http.get<any>(`${environment.dbUrl}/products/${id}`).pipe(
    catchError(error => {
      console.error('Error fetching product:', error);
      return of(null);
    })
  );
}




}
