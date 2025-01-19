import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProductService, Product, ProductFilter } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  Math = Math;
  
  activeFilters: ProductFilter = {
    category: '',
    color: [''],
    size: [''],
    minPrice: 0,
    maxPrice: 100000,
    minDiscount: 0,
    sort: 'price_low',
    stock: 'in_stock',
    pageNumber: 1,
    pageSize: 10
  };
  
  availableColors = ['RED', 'BLUE', 'GREEN', 'BLACK', 'WHITE'];
  availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  priceRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: 'Over ₹2000', min: 2000, max: 100000 }
  ];
  sortOptions = [
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Handle category from route params
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.activeFilters.category = category;
      }
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getFilteredProducts(this.activeFilters)
      .subscribe({
        next: (response) => {
          this.products = response.products;
          this.totalItems = response.totalItems;
          this.currentPage = response.currentPage;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          // Handle error appropriately
        }
      });
  }

  updatePriceRange(range: { min: number; max: number }) {
    this.activeFilters.minPrice = range.min;
    this.activeFilters.maxPrice = range.max;
    this.resetPagination();
    this.loadProducts();
  }

  updateColorFilter(color: string, checked: boolean) {
    if (!this.activeFilters.color) {
      this.activeFilters.color = [];
    }
    
    if (checked) {
      this.activeFilters.color.push(color);
    } else {
      this.activeFilters.color = this.activeFilters.color.filter(c => c !== color);
    }
    
    this.resetPagination();
    this.loadProducts();
  }

  updateSizeFilter(size: string, checked: boolean) {
    if (!this.activeFilters.size) {
      this.activeFilters.size = [];
    }
    
    if (checked) {
      this.activeFilters.size.push(size);
    } else {
      this.activeFilters.size = this.activeFilters.size.filter(s => s !== size);
    }
    
    this.resetPagination();
    this.loadProducts();
  }

  updateSort(sortValue: string) {
    this.activeFilters.sort = sortValue;
    this.resetPagination();
    this.loadProducts();
  }

  changePage(page: number) {
    this.activeFilters.pageNumber = page;
    this.loadProducts();
  }

  resetPagination() {
    this.activeFilters.pageNumber = 1;
  }

  clearFilters() {
    this.activeFilters = {
      category: '',
      color: [''],
      size: [''],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      stock: 'in_stock',
      pageNumber: 1,
      pageSize: 10
    };
    this.loadProducts();
  }

  handleColorFilterChange(event: Event, color: string) {
    const checkbox = event.target as HTMLInputElement;
    this.updateColorFilter(color, checkbox.checked);
  }

  handleSizeFilterChange(event: Event, size: string) {
    const checkbox = event.target as HTMLInputElement;
    this.updateSizeFilter(size, checkbox.checked);
  }

  handleSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSort(select.value);
  }
} 