import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailComponent } from './features/product-detail/product.detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:category/:seconLevelCategory/:thirdLevelCategory', component: ProductsComponent },
  { 
    path: 'profile', 
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES),
    canActivate: [authGuard]
  },
  { path: 'women', component: ProductsComponent, data: { category: 'women' } },
  { path: 'men', component: ProductsComponent, data: { category: 'men' } },
  { path: 'accessories', component: ProductsComponent, data: { category: 'accessories' } },
  { path: 'clothing', component: ProductsComponent, data: { category: 'clothing' } },
  { path: 'kurta', component: ProductsComponent, data: { category: 'Kurta' } },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '' },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  }
];
