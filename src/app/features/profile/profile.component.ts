import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="profile-container">
      <mat-card *ngIf="authService.currentUser$ | async as user">
        <mat-card-header>
          <mat-card-title>Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Name:</strong> {{user.firstName}} {{user.lastName}}</p>
          <p><strong>Email:</strong> {{user.email}}</p>
          <p><strong>Mobile:</strong> {{user.mobile}}</p>
          <p><strong>Role:</strong> {{user.role}}</p>
          <p><strong>Member since:</strong> {{user.createdAt | date}}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="warn" (click)="authService.logout()">Logout</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    mat-card {
      padding: 2rem;
    }

    mat-card-content {
      margin-top: 1.5rem;
    }

    mat-card-content p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    mat-card-actions {
      padding: 1rem 0 0;
    }
  `]
})
export class ProfileComponent {
  constructor(public authService: AuthService) {}
} 