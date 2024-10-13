import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CheckoutComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct total', () => {
    component.total = 100;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.total').textContent).toContain('Order Total: $100.00');
  });

  it('should disable place order button when cart is empty', () => {
    component.cartItems = [];
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('should enable place order button when cart has items', () => {
    component.cartItems = [{ product: { Id: 1, Name: 'Test', Price: 10, Category: 'Test', Description: 'Test', ImageUrl: 'test.jpg' }, quantity: 1 }];
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
  });

  it('should emit orderPlaced event when place order button is clicked and cart is not empty', () => {
    spyOn(component.orderPlaced, 'emit');
    component.cartItems = [{ product: { Id: 1, Name: 'Test', Price: 10, Category: 'Test', Description: 'Test', ImageUrl: 'test.jpg' }, quantity: 1 }];
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.orderPlaced.emit).toHaveBeenCalled();
  });

  it('should not emit orderPlaced event when place order button is clicked and cart is empty', () => {
    spyOn(component.orderPlaced, 'emit');
    component.cartItems = [];
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.orderPlaced.emit).not.toHaveBeenCalled();
  });
});