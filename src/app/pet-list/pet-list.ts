import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../services/pet.service';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-list.html',
})
export class PetListComponent implements OnInit {
  petType = signal('');
  pets = computed(() => this.petService.getPetsByType(this.petType()));

  constructor(private route: ActivatedRoute, private petService: PetService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const type = params.get('type') || '';
      this.petType.set(type);
      this.petService.setSelectedPetType(type);
    });
  }
}
