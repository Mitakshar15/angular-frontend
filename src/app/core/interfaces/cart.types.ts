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