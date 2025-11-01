import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: number[] = [];
  private favoritesSubject = new BehaviorSubject<number[]>([]);

  constructor() {
    this.loadFavoritesFromStorage();
  }

  private loadFavoritesFromStorage() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
      this.favoritesSubject.next(this.favorites);
    }
  }

  addToFavorites(productId: number) {
    if (!this.favorites.includes(productId)) {
      this.favorites.push(productId);
      this.saveFavoritesToStorage();
    }
  }

  removeFromFavorites(productId: number) {
    this.favorites = this.favorites.filter(id => id !== productId);
    this.saveFavoritesToStorage();
  }

  toggleFavorite(productId: number) {
    if (this.isFavorite(productId)) {
      this.removeFromFavorites(productId);
    } else {
      this.addToFavorites(productId);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favorites.includes(productId);
  }

  getFavorites(): number[] {
    return this.favorites;
  }

  getFavoritesCount(): number {
    return this.favorites.length;
    }
    
  private saveFavoritesToStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.favoritesSubject.next(this.favorites);
  }

  getFavoritesObservable() {
    return this.favoritesSubject.asObservable();
  }
}