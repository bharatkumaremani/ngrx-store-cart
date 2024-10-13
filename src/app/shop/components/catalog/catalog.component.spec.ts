import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { ItemComponent } from '../item/item.component';
import { Product } from '../../models/product.model';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CatalogComponent, ItemComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addToCart event when onAddToCart is called', () => {
    const mockProduct: Product = { Id: 1, Name: 'Test Product', Price: 10, Category: 'Test', Description: 'Test Description', ImageUrl: 'test.jpg' };
    spyOn(component.addToCart, 'emit');
    component.onAddToCart(mockProduct);
    expect(component.addToCart.emit).toHaveBeenCalledWith(mockProduct);
  });
});