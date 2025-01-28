// order-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Location } from '@angular/common';
import { OrderDto } from '../../core/interfaces/order.interface';
import { OrderService } from '../../core/services/order.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: OrderDto | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {this.matIconRegistry.addSvgIcon(
    'custom-back',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/back.svg')
  );}
  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'hourglass_empty';
      case 'confirmed':
        return 'check_circle';
      case 'delivered':
        return 'local_shipping';
      case 'cancelled':
        return 'cancel';
      default:
        return 'info';
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.fetchOrderDetails(params['id']);
      }
    });
  }

  fetchOrderDetails(orderId: number): void {
    this.loading = true;
    this.orderService.getOrderDetails(orderId).subscribe({
      next: (response) => {
        this.order = response.order;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
        this.error = 'Failed to load order details';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'pending',
      'PROCESSING': 'processing',
      'SHIPPED': 'shipped',
      'DELIVERED': 'delivered',
      'CANCELLED': 'cancelled'
    };
    return statusMap[status] || 'pending';
  }

  goBack(): void {
    this.location.back();
  }
}