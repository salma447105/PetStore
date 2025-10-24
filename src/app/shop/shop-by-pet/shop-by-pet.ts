import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
@Component({
  selector: 'app-shop-by-pet',
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-by-pet.html',
  styles: ``
})
export class ShopByPet implements OnInit {

  pets: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getPets().subscribe(pets => {
      this.pets = pets.map(pet => ({
        ...pet,
        image: this.getPetImage(pet.name)
      }));
    });
  }
  
  private getPetImage(petName: string): string {
    const imageMap: { [key: string]: string } = {
      'Cat': '/images/cat.png', 
      'Dog': '/images/dog.png',
      'Hamster': '/images/hamster.png',
      'Parrot': '/images/parrot.png', 
      'Rabbit': '/images/rabbit.png',
      'Turtle': '/images/turtle.png'
    };
    return imageMap[petName] ;
  }




}
