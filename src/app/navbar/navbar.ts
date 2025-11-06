import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites';
import { ProductService } from '../services/product';
import { CartService } from '../services/cart/cart.service';
import { AuthService } from '../services/auth/auth.service';
import { ClickOutsideDirective } from './click-outside.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Product {
  id: number;
  name: string;
  [key: string]: any;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, ClickOutsideDirective],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  // Search & Products
  products = signal<Product[]>([]);
  searchTerm = signal('');
  activeIndex = signal(-1);
  
  // Dropdown
  isDropdownOpen = signal(false);
  
  // Mobile Menu
  isMobileMenuOpen = signal(false);
  
  // Computed signals
  favoritesCount = signal(0);
  cartItemCount = computed(() => this.cartService.getItemCount());
  
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.products().filter(p => p.name.toLowerCase().includes(term));
  });
  
  // Auth computed signals
  isLoggedIn = computed(() => this.authService.user() !== null);
  currentUser = computed(() => this.authService.user());
  isAdmin = computed(() => {
    const user = this.authService.user();
    return user ? (user as any).role === 'admin' : false;
  });

  // Services
  private favoritesService = inject(FavoritesService);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    // Effect للـ search reset
    effect(() => {
      if (!this.searchTerm()) this.activeIndex.set(-1);
    });

    // Subscribe مع cleanup تلقائي
    this.favoritesService.getFavoritesObservable()
      .pipe(takeUntilDestroyed())
      .subscribe(favs => {
        this.favoritesCount.set(favs.length);
      });

    this.productService.getProducts()
      .pipe(takeUntilDestroyed())
      .subscribe(data => {
        this.products.set(data);
      });
  }

  ngOnInit() {
    this.favoritesCount.set(this.favoritesService.getFavoritesCount());
  }

  // Search methods
  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  goToProduct(productId: number) {
    this.searchTerm.set('');
    this.activeIndex.set(-1);
    this.router.navigate(['/product', productId]);
  }

  onKeyDown(event: KeyboardEvent) {
    const list = this.filteredProducts();
    const maxIndex = list.length - 1;
    if (!list.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.update(n => (n < maxIndex ? n + 1 : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.update(n => (n > 0 ? n - 1 : maxIndex));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const index = this.activeIndex();
      if (index >= 0 && index <= maxIndex) {
        this.goToProduct(list[index].id);
      }
    } else if (event.key === 'Escape') {
      this.searchTerm.set('');
      this.activeIndex.set(-1);
    }
  }

  // Auth methods
  getInitials(): string {
    const user = this.authService.user();
    if (!user) return '';
    
    const displayName = user.displayName || user.email || 'U';
    return displayName.charAt(0).toUpperCase();
  }

  getUserName(): string {
    const user = this.authService.user();
    return user?.displayName || 'User';
  }

  getUserEmail(): string {
    const user = this.authService.user();
    return user?.email || '';
  }

  toggleDropdown() {
    this.isDropdownOpen.update(open => !open);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  async logout() {
    this.closeDropdown();
    this.closeMobileMenu();
    const success = await this.authService.logout();
    if (success) {
      this.router.navigate(['/home']);
    }
  }

  // Mobile menu methods
  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}