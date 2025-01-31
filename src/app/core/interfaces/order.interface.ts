import { Address } from "./address.interface";
import { SkuProductDto } from "./cart.types";

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
    sku: OrderSkuDto;
    quantity: number;
    price: number;
    discountedPrice: number;
  }

  export interface OrderHistoryResponse {
    respType: string;
    status: {
      statusCode: number;
      statusMessage: string;
      statusMessageKey: string;
    };
    order_history: OrderDto[];
  }

  export interface OrderSkuDto{
   id:number;
   skuCode: string;
   color: string;
   price: number;
   size: string;
   discountedPrice: number;
   discountPercent: number;
   product:SkuProductDto;
  }