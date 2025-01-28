// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { OrderDto } from '../../core/interfaces/order.interface';
import { CartDto } from '../../core/interfaces/cart.types';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  orderHistory: OrderDto[] = [];
  currentCart: CartDto | null = null;
  loading = {
    orders: false,
    cart: false
  };
  error = {
    orders: '',
    cart: ''
  };
  activeTab = 0;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.loadOrderHistory();
    this.loadCurrentCart();
  }

  loadOrderHistory() {
    this.loading.orders = true;
    this.error.orders = '';
    
    this.orderService.getOrderHistory()
      .pipe(
        catchError(err => {
          this.error.orders = 'Failed to load order history';
          return of({ order_history: [] });
        }),
        finalize(() => this.loading.orders = false)
      )
      .subscribe(response => {
        this.orderHistory = response.order_history;
      });
  }

  loadCurrentCart() {
    this.loading.cart = true;
    this.error.cart = '';

    this.cartService.getUserCart()
      .pipe(
        catchError(err => {
          this.error.cart = 'Failed to load cart';
          return of({ data: null });
        }),
        finalize(() => this.loading.cart = false)
      )
      .subscribe(response => {
        this.currentCart = response.data;
      });
  }

  updateCartItemQuantity(itemId: number, quantity: number) {
    this.cartService.updateCartItemQuantity(itemId, quantity)
      .subscribe(response => {
        this.currentCart = response.data;
        this.loadCurrentCart();
      });

  }

  removeCartItem(itemId: number) {
    this.cartService.removeCartItem(itemId)
      .subscribe(response => {
        this.currentCart = response.data;
      });
  }

  clearCart() {
    this.cartService.clearCart()
      .subscribe(response => {
        this.currentCart = response.data;
      });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  onTabChange(event: any) {
    this.activeTab = event.index;
    if (this.activeTab === 1 && !this.orderHistory.length) {
      this.loadOrderHistory();
    } else if (this.activeTab === 2 && !this.currentCart) {
      this.loadCurrentCart();
    }
  }
}