import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.html',
  styles: ``
})
export class Filter implements OnInit {
  @Output() filterChange = new EventEmitter<any>();

  pets: any[] = [];
  categories: any[] = [];
  priceRange = { min: 0, max: 500 };
  selectedCategories: number[] = [];
  selectedPets: number[] = [];
  selectedRating: number = 0;
  availabilityFilter: string = 'all';

  constructor(private productService: ProductService) {}

  ngOnInit() {

    this.productService.getPets().subscribe(pets => {
      this.pets = pets;
    });

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

  }

  onPetChange(petId: number, event: any) {
    if (event.target.checked) {
      console.log(event.target.value);
      console.log(this.selectedPets);
      this.selectedPets.push(petId);
      console.log(this.selectedPets);
    }
    else {
      this.selectedPets = this.selectedPets.filter(id => id !== petId);
    }
  }

  onCategoryChange(categoryId: number, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
  }
  onPriceChange() {
    // Ensure min is not greater than max
    if (this.priceRange.min > this.priceRange.max) {
      const temp = this.priceRange.min;
      this.priceRange.min = this.priceRange.max;
      this.priceRange.max = temp;

    }
  }

  onRatingChange(rating: number) {
    this.selectedRating = rating;
    console.log(this.selectedRating);
  }


  onAvailabilityChange(availability: string) {
    this.availabilityFilter = availability;
    console.log(this.availabilityFilter);
  }

  applyFilters() {
    this.filterChange.emit({
      pets: this.selectedPets,
      categories: this.selectedCategories,
      priceRange: this.priceRange,
      rating: this.selectedRating,
      availability: this.availabilityFilter,
    });
  }

  clearFilters() {
    this.selectedPets = [];
    this.selectedCategories = [];
    this.selectedRating = 0;
    this.priceRange = { min: 0, max: 500 };
    this.availabilityFilter = 'all';

    // Reset all checkbox inputs
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => checkbox.checked = false);
    
    // Reset radio buttons
    const ratingRadio = document.getElementById('rating-0') as HTMLInputElement;
    if (ratingRadio) {
      ratingRadio.checked = true;
    }

    // Reset availability radio buttons
    const availabilityAll = document.getElementById('availability-all') as HTMLInputElement;
    if (availabilityAll) {
      availabilityAll.checked = true;
    }

    // Emit cleared filters
    this.filterChange.emit({
      pets: [],
      categories: [],
      priceRange: { min: 0, max: 500 },
      rating: 0,
      availability: 'all',
    });
  }
}