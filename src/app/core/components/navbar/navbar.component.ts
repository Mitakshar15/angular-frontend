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
  isSignedIn = false; // Flag to check if user is signed in

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    // Update isSignedIn based on auth status
    this.authService.currentUser$.subscribe(user => {
      this.isSignedIn = !!user;
    });
  }

  signIn() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isSignedIn = true;
      }
    });
  }

  signOut() {
    this.authService.logout();
    this.isSignedIn = false;
  }
}
