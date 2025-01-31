import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductCatalogComponent } from '../product-catalog/product-catalog.component';
import { FeaturedCatalogComponent } from '../../shared/components/featured-catalog/featured-catalog.component';
import { Catalog } from '../../shared/models/catalog.model';
import { Product } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, CarouselModule, ProductCardComponent, ProductCatalogComponent, FeaturedCatalogComponent]
})
export class HomeComponent {
  responsiveCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  };
  carouselOptions = {
    items: 1,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    loop: true
  };

  banners = [
    {
      image: 'https://img.freepik.com/free-photo/image-tourist-checking-out-something-cool-takeoff-sunglasses-say-wow-looking-aside-impressed_1258-159739.jpg?t=st=1737229948~exp=1737233548~hmac=061a1e1bb4190906de232ff6c306bfb31233430b3ed9fae35b07e92679b46a01&w=1380',
      title: 'Special Offers',
      subtitle: 'Up to 50% off on selected items'
    },
    {
      image: 'https://img.freepik.com/free-photo/travel-concept-close-up-portrait-young-beautiful-attractive-ginger-red-hair-girl-with-trendy-hat_1258-124917.jpg?t=st=1737229881~exp=1737233481~hmac=dc329dda32ee06e88684c21f33f6ceaf4b5264ee206e676183cdf8cba357e08f&w=1380',
      title: 'New Collection',
      subtitle: 'Check out our latest arrivals'
    },
    {
      image: 'https://img.freepik.com/free-photo/skeptical-disappointed-years-old-man-casual-outfit-dislike-something-bad-showing-thumbsdown_1258-155030.jpg?t=st=1737287013~exp=1737290613~hmac=52da77d06687ee1a9994e6f15d35ba78beaaf542d16f469a1c900a40da0da600&w=1380',
      title: 'Summer Sale',
      subtitle: 'Get ready for summer with our exclusive collection'
    }
  ];

  featuredCatalogs: Catalog[] = [
    {
      id: 'women',
      title: 'Women\'s Collection',
      description: 'Discover the latest trends in women\'s fashion',
      imageUrl: 'https://img.freepik.com/free-photo/stylish-woman-summer-outfit-isolated-posing-fashion-trend-isolated_285396-472.jpg',
      route: '/products',
      productCount: 150
    },
    {
      id: 'men',
      title: 'Men\'s Collection',
      description: 'Explore our curated men\'s fashion line',
      imageUrl: 'https://img.freepik.com/free-photo/full-length-portrait-handsome-serious-man_171337-17388.jpg',
      route: '/products',
      productCount: 120
    },
    {
      id: 'accessories',
      title: 'Accessories',
      description: 'Complete your look with our accessories',
      imageUrl: 'https://img.freepik.com/free-photo/accessories-men-watch-wallet-pen-cufflinks_107420-95773.jpg',
      route: '/products',
      productCount: 80
    }
  ];

  featuredProducts:Product[] = [ {
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
}
];
}
