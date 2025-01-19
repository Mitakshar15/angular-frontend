export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  originalPrice?: number;  // Optional property for sale items
} 