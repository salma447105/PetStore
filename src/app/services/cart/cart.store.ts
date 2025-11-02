import { signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  qty: number;
  image?: string;
}

export interface CartState {
  userId: string;
  items: CartItem[];
  updatedAt: Date;
}

export class CartStore {
  private state = signal<CartState | null>(null);

  // Computed signals for cart statistics
  readonly items = computed(() => this.state()?.items ?? []);
  readonly itemCount = computed(() => 
    this.items().reduce((total, item) => total + item.qty, 0)
  );
  readonly total = computed(() => 
    this.items().reduce((total, item) => total + (item.price * item.qty), 0)
  );
  readonly isEmpty = computed(() => this.items().length === 0);

  getState(): CartState | null {
    return this.state();
  }

  setState(newState: CartState | null): void {
    this.state.set(newState);
  }

  updateState(userId: string, items: CartItem[]): void {
    this.state.set({
      userId,
      items,
      updatedAt: new Date()
    });
  }

  clear(): void {
    this.state.set(null);
  }
}