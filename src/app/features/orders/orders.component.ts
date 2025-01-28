// src/app/features/order-history/order-history.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { OrderDto } from '../../core/interfaces/order.interface';
;

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderDto[] = [];
  loading = true;
  error: string | null = null;
  selectedOrder: OrderDto | null = null;
  constructor(private orderService: OrderService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }
  isScrollable(itemsLength: number): boolean {
    return itemsLength > 3;
  }
  loadOrders(): void {
    this.loading = true;
    this.error = null;

    this.orderService.getOrderHistory().subscribe({
      next: (response) => {
        if (response.order_history) {
          this.orders = response.order_history.sort((a, b) => 
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  getOrderStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered': return 'status-delivered';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  viewOrderDetails(orderId: number): void {
    this.router.navigate(['/order-details', orderId]);
  }
}