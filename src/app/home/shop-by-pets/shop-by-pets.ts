import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop-by-pets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-by-pets.html',
})
export class ShopByPetsComponent {
  pets = [
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
      image: 'https://plus.unsplash.com/premium_photo-1728300491318-6b6324240c29?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlyZHMlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
      route: '/pets/birds',
    },
    {
      id: 4,
      name: 'Fish',
      image: 'https://images.unsplash.com/photo-1752330761956-66041626e49e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZpc2hzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
      route: '/pets/fish',
    },
  ];
}
