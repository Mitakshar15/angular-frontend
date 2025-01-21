import { BaseApiResponse } from "./api.types";

export interface CartResponse {
    data: CartDto;
    status: string;
    message: string;
  }
  
  export interface CartDto {
    id: number;
    userId: number;
    cartItems: CartItemDto[];
    totalPrice: number;
    totalItem: number;
    totalDiscountedPrice: number;
    discount: number;
  }
  
  export interface CartItemDto {
    id: number;
    product: CartItemProductDto;
    size: string;
    quantity: number;
    price: number;
    discountedPrice: number;
    userId: number;
  }
  
  export interface CartItemProductDto {
    id: number;
    title: string;
    brand: string;
    color: string;
    imageUrl: string;
  }

  export interface AddItemToCartRequest {
    productId: number;
    size: string;
    quantity: number;
    Price: number;  // Note: Keeping the capital 'P' as per API spec
  }
  // cart.types.ts
export interface ApiResponse {
  respType: string;
  metadata: {
    timestamp: string;
    traceId: string;
  };
  status: {
    statusCode: number;
    statusMessage: string;
    statusMessageKey: string;
  };
  data?: any;
}
export interface AddItemToCartRequest {
  productId: number;
  size: string;
  quantity: number;
  Price: number;
}

export interface CartApiResponse extends BaseApiResponse {
  data?: CartDto;
}