// checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '../../core/interfaces/address.interface';
import { CheckoutService } from '../../core/services/checkout.service';
import { AuthService } from '../../core/services/auth.service';
import { OrderDto } from '../../core/interfaces/order.interface';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  currentStep = 1;
  addressForm: FormGroup;
  addresses: Address[] = [];
  selectedAddress: Address | null = null;
  cartItems: any; // Your cart items
  userId: number | null = null;
  order: OrderDto | null = null;
  loading: boolean  = true;
  constructor(
    private _formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.addressForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      mobile: ['', Validators.required],
    });
    
    this.authService.loadUserProfile().subscribe({
        next: (response) => {
          if (response?.data) {
            this.userId = response.data.id;
          }
        }
      });
    


  }

  ngOnInit() {
    this.loadAddresses();
    // Load cart items from your cart service
  }

  loadAddresses() {
    this.checkoutService.getAllAddresses().subscribe({
      next: (response) => {
        this.addresses = response.data;
        this.loading = false;
      },
      error: (error) => console.error('Error loading addresses:', error)
    });
  }

  selectAddress(address: Address) {
    this.selectedAddress = address;
  }

  addNewAddress() {
    const addressData = {
        ...this.addressForm.value,
        userId: this.userId
      };
    if (this.addressForm.valid) {
      this.checkoutService.addNewAddress(addressData).subscribe({
        next: (response) => {
          this.loadAddresses();
          this.addressForm.reset();
        },
        error: (error) => console.error('Error adding address:', error)
      });
    }
  }

  nextStep() {
    if (this.currentStep === 1 && this.selectedAddress) {
      this.currentStep = 2;
      this.loading = true;
      this.createOrder();
      
    }
  }

  previousStep() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  createOrder() {
    if (this.selectedAddress) {
        this.loading = true;
        this.checkoutService.createOrder(this.selectedAddress).subscribe({
          next: (response) => {
            this.order = response.order; // Store the order details
            this.loading = false;
          },
          error: (error) => {
            console.error('Error creating order:', error);
            this.loading = false;
          }
        });
      }
    }
}