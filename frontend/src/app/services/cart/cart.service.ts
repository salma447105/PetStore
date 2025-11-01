import { Injectable, effect } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartStore, CartItem, CartState } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {
  private store: CartStore;

  constructor(private authService: AuthService) {
    this.store = new CartStore();
    
    // Watch for user changes and load their cart
    effect(() => {
      const user = this.authService.user();
      if (user) {
        // Only load cart if we don't have one for this user already
        const currentCart = this.store.getState();
        if (!currentCart || currentCart.userId !== user.uid) {
          this.loadUserCart(user.uid);
        }
      }
    });
  }

  private async loadUserCart(userId: string): Promise<void> {
    try {
      // Don't clear existing cart if we already have items for this user
      const currentCart = this.store.getState();
      if (currentCart?.userId === userId && currentCart.items.length > 0) {
        return; // Keep existing cart if it's for the same user
      }

      // Load from localStorage first for immediate display
      const savedCart = localStorage.getItem(`cart_${userId}`);
      if (savedCart) {
        const cartData = JSON.parse(savedCart) as CartState;
        this.store.setState(cartData);
      } else {
        // Initialize empty cart for user
        this.store.updateState(userId, []);
      }

      // TODO: Implement server sync when backend is ready
    } catch (error) {
      console.error('Error loading cart:', error);
      // On error, keep the existing cart state instead of clearing it
      if (!this.store.getState()) {
        this.store.updateState(userId, []);
      }
    }
  }

  async addToCart(item: Omit<CartItem, 'qty'>): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      throw new Error('Must be logged in to add items to cart');
    }

    const currentCart = this.store.getState();
    const items = currentCart?.items ?? [];

    const existingItemIndex = items.findIndex(i => i.id === item.id);
    let updatedItems: CartItem[];

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      updatedItems = items.map((i, index) => 
        index === existingItemIndex ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      // Add new item
      updatedItems = [...items, { ...item, qty: 1 }];
    }

    // Update store and localStorage
    this.store.updateState(user.uid, updatedItems);
    this.persistCart(user.uid);
  }

  async updateItemQuantity(itemId: number, change: number): Promise<void> {
    const user = await this.authService.getCurrentUser();
    const currentCart = this.store.getState();
    if (!user || !currentCart) return;

    const updatedItems = currentCart.items
      .map(item => {
        if (item.id === itemId) {
          const newQty = Math.max(0, item.qty + change);
          return { ...item, qty: newQty };
        }
        return item;
      })
      .filter(item => item.qty > 0);

    this.store.updateState(user.uid, updatedItems);
    this.persistCart(user.uid);
  }

  async removeItem(itemId: number): Promise<void> {
    const user = await this.authService.getCurrentUser();
    const currentCart = this.store.getState();
    if (!user || !currentCart) return;

    const updatedItems = currentCart.items.filter(item => item.id !== itemId);
    this.store.updateState(user.uid, updatedItems);
    this.persistCart(user.uid);
  }

  async clearCart(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) return;

    this.store.updateState(user.uid, []);
    this.persistCart(user.uid);
  }

  private persistCart(userId: string): void {
    const currentCart = this.store.getState();
    if (currentCart) {
      // Ensure we're saving with the correct user ID
      if (currentCart.userId === userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify({
          ...currentCart,
          updatedAt: new Date() // Update timestamp for tracking
        }));
      } else {
        // If userIds don't match, update the cart with the correct userId before saving
        const updatedCart = {
          ...currentCart,
          userId: userId,
          updatedAt: new Date()
        };
        this.store.setState(updatedCart);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      }
    }
  }

  // Expose store computed values
  getCart = () => this.store.getState();
  getItems = () => this.store.items();
  getItemCount = () => this.store.itemCount();
  getTotal = () => this.store.total();
  isEmpty = () => this.store.isEmpty();
}