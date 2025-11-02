import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private static stripeLoadPromise: Promise<void> | null = null;
  private stripeInstance: any = null;

  async getStripeInstance(): Promise<any> {
    if (this.stripeInstance) {
      return this.stripeInstance;
    }

    await this.loadStripeScript();
    const publishableKey = environment?.stripePublishableKey;
    if (!publishableKey) {
      throw new Error('Missing Stripe publishable key');
    }

    const StripeGlobal = (window as any).Stripe;
    this.stripeInstance = StripeGlobal(publishableKey);
    return this.stripeInstance;
  }

  private loadStripeScript(): Promise<void> {
    if (StripeService.stripeLoadPromise) {
      return StripeService.stripeLoadPromise;
    }

    StripeService.stripeLoadPromise = new Promise((resolve, reject) => {
      try {
        if ((window as any).Stripe) {
          resolve();
          return;
        }

        const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/"]');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () => reject(new Error('Failed to load Stripe.js')));
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Stripe.js'));
        document.head.appendChild(script);
      } catch (e) {
        reject(e);
      }
    });

    return StripeService.stripeLoadPromise;
  }
}