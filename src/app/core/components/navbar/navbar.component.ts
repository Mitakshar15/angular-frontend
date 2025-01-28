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
  isMobileMenuOpen = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    // Initialize based on current auth state
    this.isSignedIn = this.authService.isAuthenticated();
    
    // Subscribe to auth state changes
    this.authService.isSignedIn$.subscribe(
      isSignedIn => this.isSignedIn = isSignedIn
    );

    // If authenticated, load the profile
    if (this.isSignedIn) {
      this.authService.loadUserProfile().subscribe();
    }
  }
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.classList.toggle('mobile-menu-open', this.isMobileMenuOpen);
  }
  signIn() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Auth service will handle the state update
        console.log('Successfully signed in');
      }
    });
  }

  signOut() {
    this.authService.logout();
  }
  
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.classList.remove('mobile-menu-open');
  }
}
