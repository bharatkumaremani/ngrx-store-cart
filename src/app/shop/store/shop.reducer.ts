import { createReducer, on } from '@ngrx/store';
import * as ShopActions from './shop.actions';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

export interface ShopState {
  products: Product[];
  cart: CartItem[];
  loading: boolean;
  error: any;
}

export const initialState: ShopState = {
  products: [],
  cart: [],
  loading: false,
  error: null
};

export const shopReducer = createReducer(
  initialState,
  on(ShopActions.loadProducts, state => ({ ...state, loading: true })),
  on(ShopActions.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(ShopActions.loadProductsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(ShopActions.addToCart, (state, { product }) => {
    const existingItem = state.cart.find(item => item.product.Id === product.Id);
    if (existingItem) {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.Id === product.Id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, { product, quantity: 1 }]
      };
    }
  }),
  on(ShopActions.removeFromCart, (state, { productId }) => ({
    ...state,
    cart: state.cart.filter(item => item.product.Id !== productId)
  })),
  on(ShopActions.updateCartItemQuantity, (state, { productId, quantity }) => ({
    ...state,
    cart: state.cart.map(item =>
      item.product.Id === productId ? { ...item, quantity } : item
    )
  })),
  on(ShopActions.clearCart, state => ({
    ...state,
    cart: []
  }))
);