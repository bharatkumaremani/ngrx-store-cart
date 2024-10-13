import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ShopActions from './shop.actions';
import { ShopService } from '../services/shop.service';

@Injectable()
export class ShopEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadProducts),
      mergeMap(() =>
        this.shopService.getProducts().pipe(
          map(products => ShopActions.loadProductsSuccess({ products })),
          catchError(error => of(ShopActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private shopService: ShopService
  ) {}
}