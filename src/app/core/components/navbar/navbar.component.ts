import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../../features/auth/auth.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class NavbarComponent {
  cartItemCount = 0;
  isSignedIn = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    // Subscribe to auth state changes
    this.authService.isSignedIn$.subscribe(
      isSignedIn => this.isSignedIn = isSignedIn
    );
  }

  signIn() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // No need to manually set isSignedIn, AuthService handles it
      if (result === true) {
        console.log('Successfully signed in');
      }
    });
  }

  signOut() {
    this.authService.logout();
  }
}
