import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private createUrl(endpoint: string): string {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  }

  private createOptions(options: any = {}) {
    const defaultOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
    };
    return { ...defaultOptions, ...options };
  }
  get<T>(endpoint: string, options = {}): Observable<T> {
    return this.http.get<T>(
      this.createUrl(endpoint),
      this.createOptions(options)
    ).pipe(
      map((response: HttpEvent<T>) => response as T)
    );
  }
  post<T>(endpoint: string, data: any, options = {}): Observable<T> {
    return this.http.post<T>(
      this.createUrl(endpoint),
      data,
      this.createOptions(options)
    ).pipe(
      map((response: HttpEvent<T>) => response as T)
    );
  }
  put<T>(endpoint: string, data: any, options = {}): Observable<T> {
    return this.http.put<T>(
      this.createUrl(endpoint),
      data,
      this.createOptions(options)
    ).pipe(
      map((response: HttpEvent<T>) => response as T)
    );
  }
  delete<T>(endpoint: string, options = {}): Observable<T> {
    return this.http.delete<T>(
      this.createUrl(endpoint),
      this.createOptions(options)
    ).pipe(
      map((response: HttpEvent<T>) => response as T)
    );
  }
  patch<T>(endpoint: string, data: any, options = {}): Observable<T> {
    return this.http.patch<T>(
      this.createUrl(endpoint),
      data,
      this.createOptions(options)
    ).pipe(
      map((response: HttpEvent<T>) => response as T)
    );
  }
} 