import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { OrderConfirmationDialogComponent } from './order-confirmation-dialog.component';

describe('OrderConfirmationDialogComponent', () => {
  let component: OrderConfirmationDialogComponent;
  let fixture: ComponentFixture<OrderConfirmationDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<OrderConfirmationDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ OrderConfirmationDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { total: of(100) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on cancel', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should display correct total in the dialog content', () => {
    const content = fixture.nativeElement.querySelector('mat-dialog-content');
    expect(content.textContent).toContain('Are you sure you want to place this order for $100.00?');
  });

  it('should have a cancel button', () => {
    const cancelButton = fixture.nativeElement.querySelector('button:first-child');
    expect(cancelButton.textContent).toContain('Cancel');
  });

  it('should have a confirm button', () => {
    const confirmButton = fixture.nativeElement.querySelector('button:last-child');
    expect(confirmButton.textContent).toContain('Confirm');
  });
});