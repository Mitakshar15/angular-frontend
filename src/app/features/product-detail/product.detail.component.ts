// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Product, ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product> = EMPTY;
  selectedSize?: string;
  quantity: number = 1;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.params['id']);
    this.loadProduct(productId);
  }

  private loadProduct(id: number): void {
    this.loading = true;
    this.error = '';
    
    this.product$ = this.productService.getProductById(id).pipe(
      finalize(() => {
        this.loading = false;
      }),
      catchError(err => {
        this.error = 'Failed to load product details';
        return EMPTY;
      })
    );
  }

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