import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <form [formGroup]="signInForm" (ngSubmit)="onSubmit()" class="sign-in-form">
      <h2>Welcome Back</h2>
      
      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" placeholder="Enter your email">
        <mat-error *ngIf="signInForm.get('email')?.errors?.['required']">Email is required</mat-error>
        <mat-error *ngIf="signInForm.get('email')?.errors?.['email']">Please enter a valid email</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Password</mat-label>
        <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Enter your password">
        <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
          <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        <mat-error *ngIf="signInForm.get('password')?.errors?.['required']">Password is required</mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="signInForm.invalid || isLoading">
        <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
        <span *ngIf="!isLoading">Sign In</span>
      </button>

      <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>
    </form>
  `,
  styles: [`
    .sign-in-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
    }

    mat-form-field {
      width: 100%;
    }

    button[type="submit"] {
      margin-top: 1rem;
      height: 48px;
    }

    .error-message {
      color: #f44336;
      text-align: center;
      margin-top: 1rem;
    }
  `]
})
export class SignInComponent implements OnInit {
  @Output() success = new EventEmitter<void>();
  
  signInForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // If already logged in, emit success
    if (this.authService.isAuthenticated()) {
      this.success.emit();
    }
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.signIn(this.signInForm.value).subscribe({
        next: () => {
          this.success.emit();
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = error.error?.message || 'An error occurred during sign in';
          }
        }
      });
    }
  }
} 