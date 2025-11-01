import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-products-by-pet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6">Products for {{ petName }}</h2>

      <div *ngIf="products.length > 0; else noProducts" class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div *ngFor="let product of products" class="p-4 border rounded-lg shadow">
          <img [src]="product.image" alt="{{ product.name }}" class="w-full h-40 object-cover mb-2" />
          <h4 class="font-semibold">{{ product.name }}</h4>
          <p class="text-gray-600 text-sm">{{ product.shortDesc }}</p>
          <p class="font-semibold mt-2">{{ product.price | currency }}</p>
        </div>
      </div>

      <ng-template #noProducts>
        <p class="text-gray-600 text-center mt-10">No products found for this pet.</p>
      </ng-template>
    </div>
  `
})
export class ProductsByPetComponent implements OnInit {
  petId!: number;
  petName = '';
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {

    this.petId = Number(this.route.snapshot.paramMap.get('petId'));

    this.productService.getPets().subscribe(pets => {
      const pet = pets.find(p => p.id === this.petId);
      if (pet) this.petName = pet.name;
    });

    this.productService.getProducts().subscribe(products => {
      this.products = products.filter(p => p.petId === this.petId);
    });
  }
}
