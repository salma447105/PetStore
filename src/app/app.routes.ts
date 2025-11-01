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
import { adminGuard, authGuard, guestGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
  { path: 'home', component: Home, title: 'Home' },
  { path: 'shop', component: Shop, title: 'Shop' },
  { path: 'about', component: About, title: 'About Us' },
  { path: 'contacts', component: Contacts, title: 'Contact Us' },
  { path: 'favorites', component: Favorites, title: 'Favorites', canActivate: [authGuard] },
  { path: 'cart', component: Cart, title: 'Cart', canActivate: [authGuard] },
  { path: 'login', component: Login, title: 'Login', canActivate: [guestGuard] },
  { path: 'register', component: Register, title: 'Register', canActivate: [guestGuard] },
  { path: 'forgotPass', component: ForgotPassword, title: 'Forgot Password', canActivate: [guestGuard] },
  {
    path: 'pets/:type',
    loadComponent: () =>
      import('./pet-list/pet-list').then((m) => m.PetListComponent),
    title: 'Shop by Pets',
  },

  { path: '**', component: NotFound, title: 'Not Found' },
];
