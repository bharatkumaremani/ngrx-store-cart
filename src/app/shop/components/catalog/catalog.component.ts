import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  template: `
    <div class="catalog-grid">
      <app-item 
        *ngFor="let product of products" 
        [item]="product" 
        (addToCart)="onAddToCart($event)">
      </app-item>
    </div>
  `,
  styles: [`
    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
  `]
})
export class CatalogComponent {
  @Input() products: Product[] = [];
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(product: Product) {
    this.addToCart.emit(product);
  }
}