import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule,RouterModule]
})
export class ProductCardComponent {
  @Input() product!: Product;
  constructor(private router: Router) {}

  navigateToDetail(): void {
    this.router.navigate(['/product', this.product.id]);
  }

}
