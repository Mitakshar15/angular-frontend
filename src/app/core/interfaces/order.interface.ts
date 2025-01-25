import { Address } from "./address.interface";

export interface OrderDto {
    id: number;
    order_id: string;
    user_id: number;
    orderItemList: OrderItemDTO[];
    orderDate: string;
    deliveryDate: string;
    shippingAddress: Address;
    totalPrice: number;
    totalDiscountedPrice: number;
    discount: number;
    orderStatus: string;
    totalItem: number;
    createdAt: string;
  }
  
 export interface OrderItemDTO {
    id: number;
    product: {
      id: number;
      title: string;
      brand: string;
      color: string;
      imageUrl: string;
    };
    quantity: number;
    price: number;
    discountedPrice: number;
  }