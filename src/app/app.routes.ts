import { Routes } from '@angular/router';
import { ShopComponent } from './shop/components/shop/shop.component';

export const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: '**', redirectTo: '' }
];