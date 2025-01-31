import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    SignInComponent,
    SignUpComponent
  ],
  template: `
    <div class="auth-dialog">
      <mat-tab-group>
        <mat-tab label="Sign In">
          <app-sign-in (success)="onAuthSuccess()"></app-sign-in>
        </mat-tab>
        <mat-tab label="Sign Up">
          <app-sign-up (success)="onAuthSuccess()"></app-sign-up>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .auth-dialog {
      padding: 1rem;
      min-width: 400px;
    }

    ::ng-deep .mat-mdc-dialog-container {
      padding: 0 !important;
    }

    ::ng-deep .mat-mdc-tab-body-wrapper {
      padding: 1rem 0;
    }
    
  `]
})
export class AuthComponent {
  constructor(private dialogRef: MatDialogRef<AuthComponent>) {}

  onAuthSuccess(): void {
    this.dialogRef.close(true);
  }
} 