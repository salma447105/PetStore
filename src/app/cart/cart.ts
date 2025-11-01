import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { StripeService } from '../services/stripe.service';

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
    private stripeService: StripeService
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
    // Here you would typically load cart items from a service or local storage
    this.cartItems = [
      {
        id: 1,
        name: 'Acme Dog Toy',
        description: 'Durable chew toy for playful pups',
        price: 9.99,
        qty: 2
      },
      {
        id: 2,
        name: 'Catnip Mouse',
        description: 'Interactive catnip stuffed toy',
        price: 6.5,
        qty: 1
      }
    ];
  }

  increase(item: CartItem): void {
    item.qty++;
  }

  decrease(item: CartItem): void {
    if (item.qty > 1) {
      item.qty--;
    }
  }

  remove(item: CartItem): void {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }

  getItemsCount(): number {
    return this.cartItems.reduce((total, item) => total + item.qty, 0);
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
        price: item.price
      }));

      const response = await firstValueFrom(this.http.post('http://localhost:3000/create-checkout-session', {
        items,
        total: this.total
      })) as { url?: string; id?: string };

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
