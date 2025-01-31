import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_CONFIG } from '../config/api.config';
import { Sku } from '../../shared/models/product.model';

export interface ProductCategory {
  name: string;
  parentCategory?: ProductCategory;
  level: number;
}

export interface Size {
  name: string;
  quantity: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  quantity?: number;
  brand: string;
  imageUrl: string;
  category?: ProductCategory;
  skus:Sku[];
}

export interface ProductResponse {
  products: Product[];
  totalItems: number;
  currentPage: number;
}

export interface ProductFilter {
  category?: string;
  color?: string[];
  size?: string[];
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  sort?: string;
  stock?: string;
  pageNumber?: number;
  pageSize?: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private api: ApiService) {}

  getFilteredProducts(filters: ProductFilter = {}): Observable<ProductResponse> {
    const params = {
      category: filters.category || '',
      color: filters.color || [''],
      size: filters.size || [''],
      minPrice: filters.minPrice || 0,
      maxPrice: filters.maxPrice || 100000,
      minDiscount: filters.minDiscount || 0,
      sort: filters.sort || 'price_low',
      stock: filters.stock || 'in_stock',
      pageNumber: filters.pageNumber || 1,
      pageSize: filters.pageSize || 9
    };

    return this.api.get<ProductResponse>(API_CONFIG.ENDPOINTS.PRODUCTS.LIST, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.api.get<Product>(API_CONFIG.ENDPOINTS.PRODUCTS.DETAILS(id));
  }

  // Add more methods as needed for your product operations
} 