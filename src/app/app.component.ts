import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShopComponent } from './shop/components/shop/shop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShopComponent],
  template: `
    <h1>One Page Shop</h1>
    <app-shop></app-shop>
  `,
})
export class AppComponent {}