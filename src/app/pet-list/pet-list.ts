import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-list.html',
})
export class PetListComponent {
  petType: string = '';

  pets: any[] = [];
  allPets = {
    dogs: [
      { name: 'Golden Retriever', image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16' },
      { name: 'German Shepherd', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006' },
    ],
    cats: [
      { name: 'Siamese Cat', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006' },
      { name: 'Persian Cat', image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6' },
    ],
    birds: [
      { name: 'Parrot', image: 'https://images.unsplash.com/photo-1499995909106-2d6741de64ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGFycm90fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
      { name: 'Canary', image: 'https://images.unsplash.com/photo-1654181920354-5c4add3989a1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuYXJ5JTIwYmlyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600' },
    ],
    fish: [
      { name: 'Goldfish', image: 'https://images.unsplash.com/photo-1615193978511-6b68f39f37e0' },
      { name: 'Betta', image: 'https://images.unsplash.com/photo-1559157841-1ab55c120b0e' },
    ],
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.petType = params.get('type') || '';
      this.pets = this.allPets[this.petType as keyof typeof this.allPets] || [];
    });
  }
}
