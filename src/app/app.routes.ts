import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailComponent } from './features/product-detail/product.detail.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrderHistoryComponent } from './features/orders/orders.component';
import { OrderDetailsComponent } from './features/order-details/order-deails.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:category', component: ProductsComponent, data: { renderMode: 'client' } },
  // Add product detail route before the wildcard route
  { path: 'product/:id', component: ProductDetailComponent , data: { renderMode: 'client' }}, // Changed from 'product/:id' to 'products/:id'
  { 
    path: 'profile', 
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES),
    canActivate: [authGuard]
  },
  { path: 'women', component: ProductsComponent, data: { category: 'Women' } },
  { path: 'men', component: ProductsComponent, data: { category: 'Men' } },
  { path: 'accessories', component: ProductsComponent, data: { category: 'Accessories' } },
  { path: 'new Arrivals', component: ProductsComponent, data: { category: 'New Arrivals' } },
  { path: 'sale', component: ProductsComponent, data: { category: 'Sale' } },
  { path: 'auth', component: AuthComponent },
  {path:'cart',component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'orders',component: OrderHistoryComponent},
  {
    path: 'order-details/:id',component: OrderDetailsComponent
  },
  // Wildcard route should always be last
  { path: '**', redirectTo: '' }


];