import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'women', component: ProductsComponent, data: { category: 'women' } },
  { path: 'men', component: ProductsComponent, data: { category: 'men' } },
  { path: 'accessories', component: ProductsComponent, data: { category: 'accessories' } },
  { path: '**', redirectTo: '' }
];
