import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './components/shop/shop.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [
    ShopComponent,
    CatalogComponent,
    CartComponent,
    CheckoutComponent,
    ItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ShopComponent]
})
export class ShopModule { }