import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { SignInRequest, SignUpRequest, AuthResponse, UserProfile, UserProfileResponse } from '../interfaces/auth.interface';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private isSignedInSubject = new BehaviorSubject<boolean>(false);
  isSignedIn$ = this.isSignedInSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private api: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Check for JWT and initialize auth state
    const token = this.getToken();
    if (token) {
      this.isSignedInSubject.next(true);
    }
  }

  signUp(request: SignUpRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, request).pipe(
      tap(response => {
        if (response?.data?.jwt) {
          localStorage.setItem(API_CONFIG.AUTH_TOKEN_KEY, response.data.jwt);
          this.isSignedInSubject.next(true);
          this.loadUserProfile().subscribe();
        }
      })
    );
  }

  signIn(request: SignInRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, request).pipe(
      tap(response => {
        if (response?.data?.jwt) {
          localStorage.setItem(API_CONFIG.AUTH_TOKEN_KEY, response.data.jwt);
          this.isSignedInSubject.next(true);
          this.loadUserProfile().subscribe();
        }
      })
    );
  }

  loadUserProfile(): Observable<UserProfileResponse> {
    const token = this.getToken();
    if (!token) {
      return of({ data: null as unknown as UserProfile } as UserProfileResponse);
    }

    return this.api.get<UserProfileResponse>(API_CONFIG.ENDPOINTS.USER.PROFILE).pipe(
      tap(response => {
        if (response?.data) {
          this.currentUserSubject.next(response.data);
        }
      })
    );
  }

  private clearAuth(): void {
    if (this.isBrowser) {
      localStorage.removeItem(API_CONFIG.AUTH_TOKEN_KEY);
      this.currentUserSubject.next(null);
      this.isSignedInSubject.next(false);
    }
  }

  logout(): void {
    this.clearAuth();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isBrowser && !!this.getToken();
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(API_CONFIG.AUTH_TOKEN_KEY);
  }
} 