import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="item-card">
      <h3>{{ item.Name }}</h3>
      <p class="item-price">{{ item.Price | currency }}</p>
      <button (click)="onAddToCart()" class="add-to-cart-btn">Add to Cart</button>
    </div>
  `,
  styles: [`
    .item-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      transition: box-shadow 0.3s ease;
    }
    .item-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .item-price {
      font-weight: bold;
      color: #4CAF50;
    }
    .add-to-cart-btn {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .add-to-cart-btn:hover {
      background-color: #45a049;
    }
  `]
})
export class ItemComponent {
  @Input() item!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCart.emit(this.item);
  }
}