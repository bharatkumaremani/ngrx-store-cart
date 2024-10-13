import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart">
      <h2>Your Cart</h2>
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        Your cart is empty.
      </div>
      <div *ngFor="let item of cartItems" class="cart-item">
        <div class="cart-item-details">
          <h3>{{ item.product.Name }}</h3>
          <p>Price: {{ item.product.Price | currency }}</p>
          <div class="quantity-controls">
            <button (click)="onUpdateQuantity(item.product.Id, item.quantity - 1)" [disabled]="item.quantity === 1">-</button>
            <span>{{ item.quantity }}</span>
            <button (click)="onUpdateQuantity(item.product.Id, item.quantity + 1)">+</button>
          </div>
        </div>
        <button (click)="onRemoveFromCart(item.product.Id)" class="remove-btn">Remove</button>
      </div>
    </div>
  `,
  styles: [`
    .cart {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 15px;
    }
    .empty-cart {
      text-align: center;
      color: #888;
      padding: 20px 0;
    }
    .cart-item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
    }
    .cart-item-details {
      flex-grow: 1;
    }
    .quantity-controls {
      display: flex;
      align-items: center;
      margin-top: 5px;
    }
    .quantity-controls button {
      background-color: #ddd;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
    .quantity-controls span {
      margin: 0 10px;
    }
    .remove-btn {
      background-color: #ff4d4d;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class CartComponent {
  @Input() cartItems: CartItem[] = [];
  @Output() removeFromCart = new EventEmitter<number>();
  @Output() updateQuantity = new EventEmitter<{ productId: number, quantity: number }>();

  onRemoveFromCart(productId: number) {
    this.removeFromCart.emit(productId);
  }

  onUpdateQuantity(productId: number, quantity: number) {
    if (quantity > 0) {
      this.updateQuantity.emit({ productId, quantity });
    } else {
      this.onRemoveFromCart(productId);
    }
  }
}