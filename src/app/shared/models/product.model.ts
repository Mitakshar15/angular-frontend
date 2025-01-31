export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  skus: Sku[];// Optional property for sale items
} 

export interface Sku{
  id: number;
  color: string;
  discontPercent: number;
  discountedPrice: number;
  price: number;
  quantity: number;
  size: string;
  skuCode: string;
}