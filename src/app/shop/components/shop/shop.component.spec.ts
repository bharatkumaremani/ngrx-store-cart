import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ShopComponent } from './shop.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ItemComponent } from '../item/item.component';
import * as ShopActions from '../../store/shop.actions';
import { OrderConfirmationDialogComponent } from '../order-confirmation-dialog/order-confirmation-dialog.component';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let store: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;
  const initialState = { shop: { products: [], cart: [], loading: false, error: null } };

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ ShopComponent, CatalogComponent, CartComponent, CheckoutComponent, ItemComponent ],
      providers: [ 
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(ShopActions.loadProducts());
  });

  it('should dispatch addToCart action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const mockProduct = { Id: 1, Name: 'Test Product', Price: 10, Category: 'Test', Description: 'Test Description' };
    component.addToCart(mockProduct);
    expect(dispatchSpy).toHaveBeenCalledWith(ShopActions.addToCart({ product: mockProduct }));
  });

  it('should dispatch removeFromCart action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.removeFromCart(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ShopActions.removeFromCart({ productId: 1 }));
  });

  it('should dispatch updateCartItemQuantity action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.updateCartItemQuantity({ productId: 1, quantity: 2 });
    expect(dispatchSpy).toHaveBeenCalledWith(ShopActions.updateCartItemQuantity({ productId: 1, quantity: 2 }));
  });

  it('should open confirmation dialog when placing an order', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true), close: null });
    dialog.open.and.returnValue(dialogRefSpyObj);

    const dispatchSpy = spyOn(store, 'dispatch');
    component.placeOrder();

    expect(dialog.open).toHaveBeenCalledWith(OrderConfirmationDialogComponent, {
      width: '300px',
      data: { total: component.total$ }
    });
    expect(dispatchSpy).toHaveBeenCalledWith(ShopActions.clearCart());
  });

  it('should not clear cart if order is not confirmed', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(false), close: null });
    dialog.open.and.returnValue(dialogRefSpyObj);

    const dispatchSpy = spyOn(store, 'dispatch');
    component.placeOrder();

    expect(dialog.open).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});