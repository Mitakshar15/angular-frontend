// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product, ProductService } from '../../core/services/product.service';


interface ApiResponse {
  respType: string;
  metadata: {
    timestamp: string;
    traceId: string;
  };
  status: {
    statusCode: number;
    statusMessage: string;
    statusMessageKey: string;
  };
  product: Product;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  selectedSize?: string;
  quantity: number = 1;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = Number(params['id']);
      if (productId) {
        this.loadProduct(productId);
      } else {
        this.error = 'Invalid product ID';
        this.loading = false;
      }
    });
  }

  private loadProduct(id: number) {
    this.loading = true;
    this.error = '';
    
    this.productService.getProductById(id).subscribe({
      next: (response: any) => {  // Use 'any' temporarily to handle the response
        if (response && response.product) {
          this.product = response.product;  // Access the nested product property
          this.loading = false;
          console.log('Product loaded:', this.product);
        } else {
          this.error = 'Product not found';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.error = 'Failed to load product details';
        this.loading = false;
      }
    });
}

  // Remove the setProduct method as it's unnecessary

  // Rest of your methods remain the same
  onSizeSelect(size: string): void {
    this.selectedSize = size;
  }

  updateQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.quantity = newQuantity;
    }
  }

  addToCart(): void {
    if (!this.selectedSize) {
      alert('Please select a size');
      return;
    }
    // Implement add to cart functionality
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}