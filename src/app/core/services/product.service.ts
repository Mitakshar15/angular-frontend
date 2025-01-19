import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_CONFIG } from '../config/api.config';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private api: ApiService) {}

  getAllProducts(): Observable<Product[]> {
    return this.api.get<Product[]>(API_CONFIG.ENDPOINTS.PRODUCTS.LIST);
  }

  getProductById(id: number): Observable<Product> {
    return this.api.get<Product>(API_CONFIG.ENDPOINTS.PRODUCTS.DETAILS(id));
  }


  // Add more methods as needed for your product operations
} 