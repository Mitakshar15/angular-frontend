import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { HomeComponent } from '../home/home.component';
import { title } from 'process';
import { Product } from '../../core/services/product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, ProductCardComponent]
})
export class ProductCatalogComponent {
    products:Product[] = [ {
    id: 39,
    title: "Product Title 2061",
    description: "Description For the product 2061 This is completely for the testing purpose,thank you for visiting this site, Please Give a Star fo this repository on https://github.com/Mitakshar15/ecom-backend-api",
    brand: "BRAND2061",
    skus: [
        {
            id: 39,
            skuCode: "BRAND2061 B M",
            color: "Black",
            size: "M",
            price: 3061,
            discountedPrice: 2161,
            discontPercent: 29,
            quantity: 2071
        }
    ],
    imageUrl: "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb24lMjBwcm9kdWN0fGVufDB8fDB8fHww"
},{
  id: 39,
  title: "Product Title 2061",
  description: "Description For the product 2061 This is completely for the testing purpose,thank you for visiting this site, Please Give a Star fo this repository on https://github.com/Mitakshar15/ecom-backend-api",
  brand: "BRAND2061",
  skus: [
      {
          id: 39,
          skuCode: "BRAND2061 B M",
          color: "Black",
          size: "M",
          price: 3061,
          discountedPrice: 2161,
          discontPercent: 29,
          quantity: 2071
      }
  ],
  imageUrl: "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb24lMjBwcm9kdWN0fGVufDB8fDB8fHww"
},{
  id: 39,
  title: "Product Title 2061",
  description: "Description For the product 2061 This is completely for the testing purpose,thank you for visiting this site, Please Give a Star fo this repository on https://github.com/Mitakshar15/ecom-backend-api",
  brand: "BRAND2061",
  skus: [
      {
          id: 39,
          skuCode: "BRAND2061 B M",
          color: "Black",
          size: "M",
          price: 3061,
          discountedPrice: 2161,
          discontPercent: 29,
          quantity: 2071
      }
  ],
  imageUrl: "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb24lMjBwcm9kdWN0fGVufDB8fDB8fHww"
},
{
  id: 39,
  title: "Product Title 2061",
  description: "Description For the product 2061 This is completely for the testing purpose,thank you for visiting this site, Please Give a Star fo this repository on https://github.com/Mitakshar15/ecom-backend-api",
  brand: "BRAND2061",
  skus: [
      {
          id: 39,
          skuCode: "BRAND2061 B M",
          color: "Black",
          size: "M",
          price: 3061,
          discountedPrice: 2161,
          discontPercent: 29,
          quantity: 2071
      }
  ],
  imageUrl: "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb24lMjBwcm9kdWN0fGVufDB8fDB8fHww"
}
];
}
