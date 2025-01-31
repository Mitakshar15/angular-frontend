// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product, ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { CartApiResponse } from '../../core/interfaces/cart.types';
import { AuthService } from '../../core/services/auth.service';
import { Sku } from '../../shared/models/product.model';


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
  userRating: number = 0;
  reviewTitle: string = '';
  reviewContent: string = '';
  addingToCart: boolean = false;
  existInCart: boolean = false;
  isLoggedIn: boolean = false;
  selectedSku:Sku |null = null;
  selectedColor: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,  // Adjust the import path
    private authService: AuthService
  ) {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

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
  
  getUniqueColors(): string[] {
  return [...new Set(this.product?.skus?.map(sku => sku.color))];
}

getAvailableSizes(): string[] {
  return [
    ...new Set(
      this.product?.skus
        ?.filter(sku => sku.color === this.selectedColor && sku.quantity > 0)
        ?.map(sku => sku.size)
    )
  ];
}

isColorAvailable(color: string): boolean {
  return this.product?.skus?.some(sku => sku.color === color && sku.quantity > 0)??false;
}

isSizeAvailable(size: string): boolean {
  return this.product?.skus?.some(
    sku => sku.color === this.selectedColor && sku.size === size && sku.quantity > 0
  )??false;
}

selectColor(color: string): void {
  this.selectedColor = color;
  this.selectedSize = undefined;
  this.updateSelectedSku();
}

selectSize(size: string): void {
  this.selectedSize = size;
  this.updateSelectedSku();
}

updateSelectedSku(): void {
  if (this.selectedColor && this.selectedSize) {
    this.selectedSku = this.product?.skus?.find(
      sku => sku.color === this.selectedColor && sku.size === this.selectedSize
    )??null;
  } else {
    this.selectedSku = null;
  }
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
  onSizeSelect(sku:Sku): void {
    this.selectedSize = sku.size;
    this.selectedSku = sku;
  }

  updateQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.quantity = newQuantity;
    }
  }

  // addToCart(): void {
  //   if (!this.selectedSize) {
  //     alert('Please select a size');
  //     return;
  //   }
  //   // Implement add to cart functionality
  // }
  addToCart(): void {
    if (!this.selectedSize) {
      alert('Please select a size');
      return;
    }

    if (!this.product) {
      alert('Product information not available');
      return;
    }

    // If item already exists in cart, don't proceed
    if (this.existInCart) {
      return;
    }

    if (this.addingToCart) {
      return;
    }

    this.addingToCart = true;

    const request = {
      skuId: this.selectedSku?.id,
      size: this.selectedSize,
      quantity: this.quantity,
      Price: this.product.skus[0].discountedPrice || this.product.skus[0].price
    };

    this.cartService.addToCart(request).subscribe({
      next: (response: CartApiResponse) => {
        console.log('Add to cart response:', response);
        
        if (response.status.statusMessageKey === 'ERROR') {
          if (response.status.statusCode === 404 && 
              response.status.statusMessage === 'ITEM ALREDY EXISTS IN CART') {
                this.existInCart = true;
            alert('This item already exists in your cart');
          } else {
            alert(response.status.statusMessage || 'Failed to add item to cart');
          }
        } else if (response.status.statusMessageKey === 'SUCCESS') {
          this.existInCart = true;
          alert('Product added to cart successfully!');
        }
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        if (error.error && error.error.status) {
          alert(error.error.status.statusMessage || 'Failed to add product to cart');
          this.existInCart = true;
        } else {
          alert('Failed to add product to cart');
        }
      },
      complete: () => {
        this.addingToCart = false;
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/products']);
  }
}