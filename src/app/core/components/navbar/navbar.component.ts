import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  signIn() {
    // Implement sign in logic here
    this.isSignedIn = true;
  }

  signOut() {
    this.isSignedIn = false;
  }
}
