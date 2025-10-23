import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { Shop } from './shop/shop';
import { About } from './about/about';
import { Contacts } from './contacts/contacts';
import { NotFound } from './not-found/not-found';
import { Cart } from './cart/cart';
import { Favorites } from './favorites/favorites';
import { ForgotPassword } from './forgot-password/forgot-password';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
  { path: 'home', component: Home, title: 'Home' },
  { path: 'shop', component: Shop, title: 'Shop' },
  { path: 'about', component: About, title: 'About Us' },
  { path: 'contacts', component: Contacts, title: 'Contact Us' },
  { path: 'favorites', component: Favorites, title: 'Favorites' },
  { path: 'cart', component: Cart, title: 'Cart' },
  { path: 'login', component: Login, title: 'Login' },
  { path: 'register', component: Register, title: 'Register' },
  { path: 'forgot', component: ForgotPassword, title: 'Forgot Password' },
  {
    path: 'pets/:type',
    loadComponent: () =>
      import('./pet-list/pet-list').then((m) => m.PetListComponent),
    title: 'Shop by Pets',
  },
  {
  path: 'category/:id',
  loadComponent: () => import('./category-list/category-list').then(m => m.CategoryListComponent)
},


  { path: '**', component: NotFound, title: 'Not Found' },
];
