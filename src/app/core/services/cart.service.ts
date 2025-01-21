import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartResponse } from '../interfaces/cart.types';
import { API_CONFIG } from '../config/api.config';
 // Adjust the import path

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}

  getUserCart(): Observable<CartResponse> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.GET}`;
    return this.http.get<CartResponse>(url);
  }

  addToCart(productId: number, size: string): Observable<CartResponse> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.ADD_ITEM}`;
    return this.http.post<CartResponse>(url, { productId, size });
  }

  updateCartItemQuantity(cartItemId: number, quantity: number): Observable<CartResponse> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.UPDATE_QUANTITY(cartItemId, quantity)}`;
    return this.http.put<CartResponse>(url, {});
  }

  removeCartItem(cartItemId: number): Observable<CartResponse> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.REMOVE_ITEM(cartItemId)}`;
    return this.http.delete<CartResponse>(url);
  }

  clearCart(): Observable<CartResponse> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.CLEAR}`;
    return this.http.delete<CartResponse>(url);
  }
}