import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { StripeService } from '../services/stripe.service';
import { CartService } from '../services/cart/cart.service';

interface CartItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  qty: number;
  image?: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './cart.html',
  styles: ``
})
export class Cart implements OnInit {
  isLoading = true;
  isCheckingOut = false;
  error: string | null = null;
  cartItems: CartItem[] = [];
  
  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  constructor(
    private http: HttpClient,
    private stripeService: StripeService,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Simulate loading cart items (replace with your actual cart service)
      this.isLoading = true;
      await this.loadCartItems();
    } catch (err) {
      this.error = 'Failed to load cart items';
      console.error('Error loading cart:', err);
    } finally {
      this.isLoading = false;
    }
  }

  private async loadCartItems(): Promise<void> {
    try {
      const cartData = this.cartService.getCart();
      this.cartItems = cartData?.items ?? [];
      this.error = null;
    } catch (error) {
      console.error('Error loading cart items:', error);
      this.error = 'Failed to load cart items. Please try again.';
      this.cartItems = [];
    }
  }

  async increase(item: CartItem): Promise<void> {
    await this.cartService.updateItemQuantity(item.id, 1);
    await this.loadCartItems();
  }

  async decrease(item: CartItem): Promise<void> {
    if (item.qty > 1) {
      await this.cartService.updateItemQuantity(item.id, -1);
      await this.loadCartItems();
    }
  }

  async remove(item: CartItem): Promise<void> {
    await this.cartService.removeItem(item.id);
    await this.loadCartItems();
  }

  getItemsCount(): number {
    return this.cartService.getItemCount();
  }

  async checkout(): Promise<void> {
    try {
      if (!this.cartItems.length) {
        this.error = 'Your cart is empty.';
        return;
      }

      this.isCheckingOut = true;
      this.error = null;

      const items = this.cartItems.map(item => ({
        name: item.name,
        description: item.description,
        quantity: item.qty,
        price: item.price,
        image: item.image
      }));

      const response = await firstValueFrom(
        this.http.post<{ url?: string; id?: string }>('http://localhost:4100/create-checkout-session', {
          items,
          total: this.total
        })
      );

      if (response?.url) {
        window.location.href = response.url;
        return;
      }

      if (!response?.id) {
        throw new Error('Invalid response from server');
      }

      const stripe = await this.stripeService.getStripeInstance();
      const { error } = await stripe.redirectToCheckout({ sessionId: response.id });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      this.error = 'Error during checkout. Please try again.';
    } finally {
      this.isCheckingOut = false;
    }
  }
}
