import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartDto, CartItemDto } from '../../core/interfaces/cart.types';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: CartDto | null = null;
  loading = true;
  error: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.error = null;
    
    this.cartService.getUserCart().subscribe({
      next: (response) => {
        this.cart = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load cart';
        this.loading = false;
      }
    });
  }

  updateQuantity(item: CartItemDto, change: number): void {

    this.cartService.updateCartItemQuantity(item.id, change).subscribe({
      next: (response) => {
        this.cart = response.data;
      },
      error: (error) => {
        this.error = error.message || 'Failed to update quantity';
      }
    });
  }

  removeItem(itemId: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeCartItem(itemId).subscribe({
        next: (response) => {
          this.cart = response.data;
        },
        error: (error) => {
          this.error = error.message || 'Failed to remove item';
        }
      });
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart().subscribe({
        next: (response) => {
          this.cart = response.data;
        },
        error: (error) => {
          this.error = error.message || 'Failed to clear cart';
        }
      });
    }
  }

  getDiscountPercentage(original: number, discounted: number): number {
    return Math.round(((original - discounted) / original) * 100);
  }

  proceedToCheckout(): void {
    // Implement checkout logic
    console.log('Proceeding to checkout...');
  }
}