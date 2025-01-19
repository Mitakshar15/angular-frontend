import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';

interface ProductFilter {
  category?: string;
  priceRange?: { min: number; max: number };
  brands?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule]
})
export class ProductsComponent implements OnInit {
  products = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      description: 'Essential cotton t-shirt',
      price: 29.99,
      imageUrl: 'assets/images/products/tshirt.jpg',
      brand: 'Essential Wear',
      category: 'men'
    },
    {
      id: 2,
      name: 'Floral Summer Dress',
      description: 'Light and breezy summer dress',
      price: 59.99,
      imageUrl: 'assets/images/products/dress.jpg',
      brand: 'Fashion Elite',
      category: 'women'
    },
    {
      id: 3,
      name: 'Leather Handbag',
      description: 'Classic leather handbag',
      price: 89.99,
      imageUrl: 'assets/images/products/handbag.jpg',
      brand: 'Luxury Brand',
      category: 'accessories'
    },
    {
      id: 4,
      name: 'Men\'s Denim Jeans',
      description: 'Classic fit denim jeans',
      price: 79.99,
      imageUrl: 'assets/images/products/jeans.jpg',
      brand: 'Essential Wear',
      category: 'men'
    },
    {
      id: 5,
      name: 'Women\'s Blazer',
      description: 'Professional women\'s blazer',
      price: 129.99,
      imageUrl: 'assets/images/products/blazer.jpg',
      brand: 'Fashion Elite',
      category: 'women'
    }
  ];

  filteredProducts = [...this.products];
  activeFilters: ProductFilter = {};
  
  availableBrands = ['Essential Wear', 'Luxury Brand', 'Sports Pro', 'Fashion Elite'];
  priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Over $200', min: 200, max: Infinity }
  ];
  sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Handle both route params and data
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.activeFilters.category = category;
        this.applyFilters();
      }
    });

    // Handle route data for direct category routes
    this.route.data.subscribe(data => {
      if (data['category'] && !this.activeFilters.category) {
        this.activeFilters.category = data['category'];
        this.applyFilters();
      }
    });

    // Initial filter application
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.products];

    // Apply category filter
    if (this.activeFilters.category) {
      filtered = filtered.filter(product => 
        product.category === this.activeFilters.category
      );
    }

    // Apply price range filter
    if (this.activeFilters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= this.activeFilters.priceRange!.min && 
        product.price <= this.activeFilters.priceRange!.max
      );
    }

    // Apply brand filter
    if (this.activeFilters.brands && this.activeFilters.brands.length > 0) {
      filtered = filtered.filter(product => 
        this.activeFilters.brands!.includes(product.brand)
      );
    }

    // Apply sorting
    if (this.activeFilters.sortBy) {
      filtered.sort((a, b) => {
        switch (this.activeFilters.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          // Add other sorting logic as needed
          default:
            return 0;
        }
      });
    }

    this.filteredProducts = filtered;
  }

  updatePriceRange(range: { min: number; max: number }) {
    this.activeFilters.priceRange = range;
    this.applyFilters();
  }

  updateBrandFilter(brand: string, checked: boolean) {
    if (!this.activeFilters.brands) {
      this.activeFilters.brands = [];
    }
    
    if (checked) {
      this.activeFilters.brands.push(brand);
    } else {
      this.activeFilters.brands = this.activeFilters.brands.filter(b => b !== brand);
    }
    
    this.applyFilters();
  }

  updateSort(sortValue: 'price-asc' | 'price-desc' | 'newest' | 'popular') {
    this.activeFilters.sortBy = sortValue;
    this.applyFilters();
  }

  clearFilters() {
    this.activeFilters = {};
    this.filteredProducts = [...this.products];
  }

  handleBrandFilterChange(event: Event, brand: string) {
    const checkbox = event.target as HTMLInputElement;
    this.updateBrandFilter(brand, checkbox.checked);
  }

  handleSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSort(select.value as 'price-asc' | 'price-desc' | 'newest' | 'popular');
  }
} 