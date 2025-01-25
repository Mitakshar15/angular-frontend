import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartDto, CartItemDto } from '../../core/interfaces/cart.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private router = inject(Router);
  cart: CartDto | null = null;
  loading = true;
  error: string | null = null;
  cartItemsOrder: number[] = []; // To maintain item order
  isCartEmpty:boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.error = null;
    
    this.cartService.getUserCart().subscribe({
      next: (response) => {
        if (response.data) {
          // Store initial order of items if not already stored
          if (this.cartItemsOrder.length === 0) {
            this.cartItemsOrder = response.data.cartItems.map(item => item.id);
          }
          
          // Sort cart items based on stored order
          const sortedItems = [...response.data.cartItems].sort((a, b) => {
            this.isCartEmpty = false;
            return this.cartItemsOrder.indexOf(a.id) - this.cartItemsOrder.indexOf(b.id);
          });
          
          this.cart = {
            ...response.data,
            cartItems: sortedItems
          };
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load cart';
        this.loading = false;
      }
    });

  }

  updateQuantity(item: CartItemDto, change: number): void {
    // Store current cart state
    const currentCart = this.cart;

    // Optimistically update the UI
    if (this.cart) {
      const updatedItems = this.cart.cartItems.map(cartItem => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + change };
        }
        return cartItem;
      });

      this.cart = {
        ...this.cart,
        cartItems: updatedItems
      };
    }

    this.cartService.updateCartItemQuantity(item.id, change).subscribe({
      next: (response) => {
        if (response.data) {
          // Maintain the order while updating with new data
          const sortedItems = [...response.data.cartItems].sort((a, b) => {
            return this.cartItemsOrder.indexOf(a.id) - this.cartItemsOrder.indexOf(b.id);
          });
          
          this.cart = {
            ...response.data,
            cartItems: sortedItems
          };
        }
      },
      error: (error) => {
        // Revert to previous state on error
        this.cart = currentCart;
        this.error = error.message || 'Failed to update quantity';
      }
    });
  }

  removeItem(itemId: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      // Store current cart state
      const currentCart = this.cart;

      // Optimistically update UI
      if (this.cart) {
        this.cart = {
          ...this.cart,
          cartItems: this.cart.cartItems.filter(item => item.id !== itemId)
        };
      }

      this.cartService.removeCartItem(itemId).subscribe({
        next: (response) => {
          if (response.data) {
            // Update cartItemsOrder after successful removal
            this.cartItemsOrder = this.cartItemsOrder.filter(id => id !== itemId);
            
            const sortedItems = [...response.data.cartItems].sort((a, b) => {
              return this.cartItemsOrder.indexOf(a.id) - this.cartItemsOrder.indexOf(b.id);
            });
            
            this.cart = {
              ...response.data,
              cartItems: sortedItems
            };
          }
        },
        error: (error) => {
          // Revert to previous state on error
          this.cart = currentCart;
          this.error = error.message || 'Failed to remove item';
        }
      });
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      // Store current cart state
      const currentCart = this.cart;

      // Optimistically update UI
      if (this.cart) {
        this.cart = {
          ...this.cart,
          cartItems: []
        };
      }

      this.cartService.clearCart().subscribe({
        next: (response) => {
          if (response.data) {
            this.cart = null;
            this.cartItemsOrder = []; // Reset order when cart is cleared
          }
        },
        error: (error) => {
          // Revert to previous state on error
          this.cart = currentCart;
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
    this.router.navigate(['/checkout']);
    console.log('Proceeding to checkout...');
  }
}