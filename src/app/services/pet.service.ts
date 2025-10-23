import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PetService {
  petTypes = signal([
    {
      id: 1,
      name: 'Dogs',
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
      route: '/pets/dogs',
    },
    {
      id: 2,
      name: 'Cats',
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      route: '/pets/cats',
    },
    {
      id: 3,
      name: 'Birds',
      image: 'https://plus.unsplash.com/premium_photo-1728300491318-6b6324240c29?...',
      route: '/pets/birds',
    },
    {
      id: 4,
      name: 'Fish',
      image: 'https://images.unsplash.com/photo-1752330761956-66041626e49e?...',
      route: '/pets/fish',
    },
  ]);

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
      { name: 'Parrot', image: 'https://images.unsplash.com/photo-1499995909106-2d6741de64ec?...' },
      { name: 'Canary', image: 'https://images.unsplash.com/photo-1654181920354-5c4add3989a1?...' },
    ],
    fish: [
      { name: 'Goldfish', image: 'https://images.unsplash.com/photo-1615193978511-6b68f39f37e0' },
      { name: 'Betta', image: 'https://images.unsplash.com/photo-1559157841-1ab55c120b0e' },
    ],
  };

  selectedPetType = signal<string>('');

  setSelectedPetType(type: string) {
    this.selectedPetType.set(type);
  }

  getPetsByType(type: string) {
    return this.allPets[type as keyof typeof this.allPets] || [];
  }
}
