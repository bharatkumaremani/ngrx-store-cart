import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe, CommonModule } from '@angular/common';
import { ShopState } from '../../store/shop.reducer';
import * as ShopActions from '../../store/shop.actions';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    CatalogComponent,
    CartComponent,
    CheckoutComponent,
    AsyncPipe,
    CurrencyPipe,
  ],
  template: `
    <div class="shop-container">
      <div class="catalog-container">
        <h1>Our Products</h1>
        <app-catalog [products]="(products$ | async) || []" (addToCart)="addToCart($event)"></app-catalog>
      </div>
      <div class="cart-checkout-container">
        <app-cart 
          [cartItems]="(cartItems$ | async) || []" 
          (removeFromCart)="removeFromCart($event)" 
          (updateQuantity)="updateCartItemQuantity($event)">
        </app-cart>
        <app-checkout 
          [total]="(total$ | async) || 0"
          [cartItems]="(cartItems$ | async) || []"
          (orderPlaced)="placeOrder()">
        </app-checkout>
      </div>
    </div>
  `,
  styles: [`
    .shop-container {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .catalog-container {
      width: 65%;
    }
    .cart-checkout-container {
      width: 30%;
    }
    h1 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }
  `]
})
export class ShopComponent implements OnInit {
  products$: Observable<any[]>;
  cartItems$: Observable<any[]>;
  total$: Observable<number>;

  constructor(private store: Store<{ shop: ShopState }>) {
    this.products$ = this.store.select((state) => state.shop.products);
    this.cartItems$ = this.store.select((state) => state.shop.cart);
    this.total$ = this.store.select((state) =>
      state.shop.cart.reduce(
        (total, item) => total + item.product.Price * item.quantity,
        0
      )
    );
  }

  ngOnInit() {
    this.store.dispatch(ShopActions.loadProducts());
  }

  addToCart(product: any) {
    this.store.dispatch(ShopActions.addToCart({ product }));
  }

  removeFromCart(productId: number) {
    this.store.dispatch(ShopActions.removeFromCart({ productId }));
  }

  updateCartItemQuantity(event: { productId: number; quantity: number }) {
    this.store.dispatch(ShopActions.updateCartItemQuantity(event));
  }

  placeOrder() {
    console.log('Order placed successfully!');
    this.store.dispatch(ShopActions.clearCart());
  }
}