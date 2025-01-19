import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
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
  private isBrowser: boolean;

  constructor(
    private api: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Check if user is already logged in
    if (this.isAuthenticated()) {
      this.loadUserProfile().subscribe();
    }
  }

  signUp(request: SignUpRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, request).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => {
        console.error('Sign up error:', error);
        throw error;
      })
    );
  }

  signIn(request: SignInRequest, returnUrl?: string): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, request).pipe(
      tap(response => this.handleAuthResponse(response, returnUrl)),
      catchError(error => {
        console.error('Sign in error:', error);
        throw error;
      })
    );
  }

  loadUserProfile(): Observable<UserProfileResponse> {
    return this.api.get<UserProfileResponse>(API_CONFIG.ENDPOINTS.USER.PROFILE).pipe(
      tap(response => {
        this.currentUserSubject.next(response.data);
      }),
      catchError(error => {
        console.error('Load profile error:', error);
        if (error.status === 401) {
          this.logout();
        }
        throw error;
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(API_CONFIG.AUTH_TOKEN_KEY);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const token = localStorage.getItem(API_CONFIG.AUTH_TOKEN_KEY);
    return !!token;
  }

  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(API_CONFIG.AUTH_TOKEN_KEY);
  }

  private handleAuthResponse(response: AuthResponse, returnUrl?: string): void {
    if (response.data.jwt && this.isBrowser) {
      localStorage.setItem(API_CONFIG.AUTH_TOKEN_KEY, response.data.jwt);
      this.loadUserProfile().subscribe({
        next: () => {
          const url = returnUrl || '/';
          this.router.navigateByUrl(url);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }
} 