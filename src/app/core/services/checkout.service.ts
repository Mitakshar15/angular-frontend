// services/checkout.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../interfaces/address.interface';
import { API_CONFIG } from '../config/api.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private http = inject(HttpClient);
  constructor(protected AuthService: AuthService){

  }
  private getHeaders(): HttpHeaders {
    // const token = localStorage.getItem(API_CONFIG.AUTH_TOKEN_KEY);
    // return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const token = this.AuthService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllAddresses(): Observable<any> {
    return this.http.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.ADDRESS.LIST}`,
      { headers: this.getHeaders() }
    );
  }

  addNewAddress(address: Address): Observable<any> {
    return this.http.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.ADDRESS.ADD}`,
      address,
      { headers: this.getHeaders() }
    );
  }

  editAddress(addressId: number, address: Address): Observable<any> {
    return this.http.put(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.ADDRESS.EDIT(addressId)}`,
      address,
      { headers: this.getHeaders() }
    );
  }

  deleteAddress(addressId: number): Observable<any> {
    return this.http.delete(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.ADDRESS.DELETE(addressId)}`,
      { headers: this.getHeaders() }
    );
  }

  createOrder(address: Address): Observable<any> {
    return this.http.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER.CREATE}`,
      address,
      { headers: this.getHeaders() }
    );
  }

  getCart(): Observable<any> {
    return this.http.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.GET}`,
      { headers: this.getHeaders() }
    );
  }
}