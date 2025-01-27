export const API_CONFIG = {
 // BASE_URL: 'http://localhost:5454/v1',
  BASE_URL:'ecom-backend-api.railway.internal/v1',
  AUTH_TOKEN_KEY: 'auth_token',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/signin',
      REGISTER: '/auth/signup',
    },
    USER: {
      PROFILE: '/user/profile',
      EDIT_PROFILE: '/user/editProfile',
      ADDRESS: {
        LIST: '/user/address',
        ADD: '/user/address/add',
        DELETE: (addressId: number) => `/user/address/delete/${addressId}`,
        EDIT: (addressId: number) => `/user/address/edit/${addressId}`,
      }
    },
    CART: {
      GET: '/user/cart',
      ADD_ITEM: '/user/cart/add',
      REMOVE_ITEM: (cartItemId: number) => `/user/cart/item/remove/${cartItemId}`,
      UPDATE_QUANTITY: (cartItemId: number, quantity: number) => `/user/cart/item/${cartItemId}/${quantity}`,
      CLEAR: '/user/cart/clear'
    },
    PRODUCTS: {
      LIST: '/products',
      DETAILS: (id: number) => `/products/${id}`,
      RATINGS: {
        GET: (productId: number) => `/product/ratings/${productId}`,
        CREATE: '/product/ratings/create'
      },
      REVIEWS: {
        GET: (productId: number) => `/product/reviews/${productId}`,
        CREATE: '/product/reviews/create'
      }
    },
    ORDER: {
      CREATE: '/user/order/create',
      LIST: '/user/order/allOrders',
      DETAILS: (orderId: number) => `/user/order/${orderId}`
    }
  }
}; 
