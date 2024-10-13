import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="checkout">
      <h2>Checkout</h2>
      <p class="total">Order Total: {{ total | currency }}</p>
      <button 
        (click)="onPlaceOrder()" 
        [disabled]="cartItems.length === 0"
        class="place-order-btn"
        [class.disabled]="cartItems.length === 0">
        Place Order
      </button>
    </div>
  `,
  styles: [`
    .checkout {
      margin-top: 20px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .total {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .place-order-btn {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    .place-order-btn:hover:not(.disabled) {
      background-color: #45a049;
    }
    .place-order-btn.disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class CheckoutComponent {
  @Input() total: number = 0;
  @Input() cartItems: CartItem[] = [];
  @Output() orderPlaced = new EventEmitter<void>();

  onPlaceOrder() {
    if (this.cartItems.length > 0) {
      this.orderPlaced.emit();
    }
  }
}