import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const loadProducts = createAction('[Shop] Load Products');
export const loadProductsSuccess = createAction('[Shop] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Shop] Load Products Failure', props<{ error: any }>());

export const addToCart = createAction('[Shop] Add To Cart', props<{ product: Product }>());
export const removeFromCart = createAction('[Shop] Remove From Cart', props<{ productId: number }>());
export const updateCartItemQuantity = createAction('[Shop] Update Cart Item Quantity', props<{ productId: number, quantity: number }>());
export const clearCart = createAction('[Shop] Clear Cart');