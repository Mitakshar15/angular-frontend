// src/app/core/services/order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { OrderHistoryResponse } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrderHistory(): Observable<OrderHistoryResponse> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER.LIST}`;
    return this.http.get<OrderHistoryResponse>(url);
  }

  getOrderDetails(orderId: number): Observable<any> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER.DETAILS(orderId)}`;
    return this.http.get(url);
  }
}