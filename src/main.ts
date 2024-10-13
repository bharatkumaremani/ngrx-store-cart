import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { shopReducer } from './app/shop/store/shop.reducer';
import { ShopEffects } from './app/shop/store/shop.effects';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideStore({ shop: shopReducer }),
    provideEffects([ShopEffects]),
    provideStoreDevtools(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));