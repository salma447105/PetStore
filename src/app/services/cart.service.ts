import { Injectable, computed, effect, signal } from '@angular/core';
import { AuthService } from './auth/auth.service';

export interface CartItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  qty: number;
  image?: string;
}

export interface UserCart {
  userId: string;
  items: CartItem[];
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = signal<UserCart | null>(null);

  // Computed values for cart stats
  readonly cartItemCount = computed(() => 
    this.cart()?.items.reduce((total, item) => total + item.qty, 0) ?? 0
  );

  readonly cartTotal = computed(() => 
    this.cart()?.items.reduce((total, item) => total + (item.price * item.qty), 0) ?? 0
  );

  constructor(private authService: AuthService) {
    // Watch for user changes and load their cart
    effect(() => {
      const user = this.authService.user();
      if (user) {
        this.loadUserCart(user.uid);
      } else {
        this.cart.set(null);
      }
    });
  }

  private async loadUserCart(userId: string): Promise<void> {
    try {
      // Load from localStorage first for immediate display
      const savedCart = localStorage.getItem(`cart_${userId}`);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Ensure dates are properly parsed
        parsedCart.updatedAt = new Date(parsedCart.updatedAt);
        this.cart.set(parsedCart);
      } else {
        // Initialize empty cart for new users
        this.cart.set({
          userId,
          items: [],
          updatedAt: new Date()
        });
      }

      // Then load from server and update if different
      // TODO: Implement server sync when backend is ready
    } catch (error) {
      console.error('Error loading cart:', error);
      // Initialize empty cart on error
      this.cart.set({
        userId,
        items: [],
        updatedAt: new Date()
      });
    }
  }

  async addToCart(item: Omit<CartItem, 'qty'>): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      throw new Error('Must be logged in to add items to cart');
    }

    const currentCart = this.cart();
    const updatedCart: UserCart = {
      userId: user.uid,
      items: [],
      updatedAt: new Date()
    };

    if (currentCart) {
      const existingItem = currentCart.items.find(i => i.id === item.id);
      if (existingItem) {
        // Update quantity if item exists
        updatedCart.items = currentCart.items.map(i => 
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        // Add new item
        updatedCart.items = [...currentCart.items, { ...item, qty: 1 }];
      }
    } else {
      // Create new cart with single item
      updatedCart.items = [{ ...item, qty: 1 }];
    }

    // Update local storage
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart));
    
    // Update signal
    this.cart.set(updatedCart);
  }

  async updateItemQuantity(itemId: number, change: number): Promise<void> {
    const user = await this.authService.getCurrentUser();
    const currentCart = this.cart();
    if (!user || !currentCart) return;

    const updatedCart: UserCart = {
      userId: user.uid,
      items: currentCart.items.map(item => {
        if (item.id === itemId) {
          const newQty = Math.max(0, item.qty + change);
          return { ...item, qty: newQty };
        }
        return item;
      }).filter(item => item.qty > 0), // Remove items with qty 0
      updatedAt: new Date()
    };

    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart));
    this.cart.set(updatedCart);
  }

  async removeItem(itemId: number): Promise<void> {
    const user = await this.authService.getCurrentUser();
    const currentCart = this.cart();
    if (!user || !currentCart) return;

    const updatedCart: UserCart = {
      userId: user.uid,
      items: currentCart.items.filter(item => item.id !== itemId),
      updatedAt: new Date()
    };

    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart));
    this.cart.set(updatedCart);
  }

  async clearCart(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) return;

    const emptyCart: UserCart = {
      userId: user.uid,
      items: [],
      updatedAt: new Date()
    };

    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(emptyCart));
    this.cart.set(emptyCart);
  }

  getCart(): UserCart | null {
    return this.cart();
  }
}