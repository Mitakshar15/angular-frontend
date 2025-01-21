import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailComponent } from './features/product-detail/product.detail.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:category/:seconLevelCategory/:thirdLevelCategory', component: ProductsComponent },
  // Add product detail route before the wildcard route
  { path: 'product/:id', component: ProductDetailComponent }, // Changed from 'product/:id' to 'products/:id'
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
  {path:'cart',component: CartComponent},
  // Wildcard route should always be last
  { path: '**', redirectTo: '' },

];