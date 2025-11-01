import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CartService } from './cart/cart.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  async clearCurrentSession(): Promise<void> {
    try {
      // Clear authentication
      await this.authService.logout();
      
      // Clear localStorage
      const user = this.authService.user();
      if (user) {
        localStorage.removeItem(`cart_${user.uid}`);
      }
      
      // Clear any other user-specific data from localStorage
      localStorage.removeItem('lastOrder');
      localStorage.removeItem('userPreferences');
      
      console.log('User session cleared successfully');
    } catch (error) {
      console.error('Error clearing user session:', error);
      throw error;
    }
  }
}