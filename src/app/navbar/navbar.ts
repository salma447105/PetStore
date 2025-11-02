import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, AsyncPipe, NgFor } from '@angular/common';
import { FavoritesService } from '../services/favorites';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgFor, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  favoritesCount = signal(0);
  products = signal<any[]>([]);
  searchTerm = signal('');
  activeIndex = signal(-1);

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.products().filter(p => p.name.toLowerCase().includes(term));
  });

  private favoritesService = inject(FavoritesService);
  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit() {
    this.favoritesCount.set(this.favoritesService.getFavoritesCount());
    this.favoritesService.getFavoritesObservable().subscribe(favs => {
      this.favoritesCount.set(favs.length);
    });

    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
    });

    effect(() => {
      if (!this.searchTerm()) this.activeIndex.set(-1);
    });
  }

  onSearchChange(value: string) {
    this.searchTerm.set(value);
  }

  goToProduct(productId: number) {
    this.searchTerm.set('');
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
      if (index >= 0 && index <= maxIndex) this.goToProduct(list[index].id);
    }
  }
}
