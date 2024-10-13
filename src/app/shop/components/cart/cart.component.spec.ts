import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removeFromCart event', () => {
    spyOn(component.removeFromCart, 'emit');
    component.onRemoveFromCart(1);
    expect(component.removeFromCart.emit).toHaveBeenCalledWith(1);
  });

  it('should emit updateQuantity event when quantity is greater than 0', () => {
    spyOn(component.updateQuantity, 'emit');
    component.onUpdateQuantity(1, 2);
    expect(component.updateQuantity.emit).toHaveBeenCalledWith({
      productId: 1,
      quantity: 2,
    });
  });

  it('should emit removeFromCart event when quantity becomes 0', () => {
    spyOn(component.removeFromCart, 'emit');
    component.onUpdateQuantity(1, 0);
    expect(component.removeFromCart.emit).toHaveBeenCalledWith(1);
  });

  it('should display empty cart message when cart is empty', () => {
    component.cartItems = [];
    fixture.detectChanges();
    const emptyCartMessage = fixture.nativeElement.querySelector('.empty-cart');
    expect(emptyCartMessage.textContent).toContain('Your cart is empty.');
  });

  it('should display cart items when cart is not empty', () => {
    component.cartItems = [
      {
        product: {
          Id: 1,
          Name: 'Test Product',
          Price: 10,
          Category: 'Test',
          Description: 'Test Description',
          ImageUrl: '',
        },
        quantity: 1,
      },
    ];
    fixture.detectChanges();
    const cartItems = fixture.nativeElement.querySelectorAll('.cart-item');
    expect(cartItems.length).toBe(1);
  });
});
