import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-shop-by-pets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-by-pets.html',
})
export class ShopByPetsComponent implements OnInit {
  pets: any[] = [];

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    this.pets = this.petService.petTypes();
  }

  onPetClick(pet: { name: string }): void {
    const type = pet.name.toLowerCase();
    this.petService.setSelectedPetType(type);
    this.router.navigate(['/pets', type]);
  }
}
