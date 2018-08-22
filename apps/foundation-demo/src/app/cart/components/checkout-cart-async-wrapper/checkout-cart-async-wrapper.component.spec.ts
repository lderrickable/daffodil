import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Cart, CartFactory } from '@daffodil/core';

import { CheckoutCartAsyncWrapperComponent } from './checkout-cart-async-wrapper.component';

let cartFactory = new CartFactory();
let cart = cartFactory.create();
let stubCartTitle = 'cartTitle';

@Component({template: '<checkout-cart-async-wrapper [cartTitle]="cartTitleValue" [cart]="cartValue$ | async" [loading]="loadingValue$ | async"><div class="transcluded-content"></div></checkout-cart-async-wrapper>'})
class TestCheckoutCartAsyncWrapper {
  cartValue$: Observable<Cart>;
  loadingValue$: Observable<boolean>;
  cartTitleValue: string;
}

@Component({
  selector: 'checkout-cart',
  template: ''
})
class MockCheckoutCartComponent { 
  @Input() cart: Cart;
  @Input() subtitle: string;
}

@Component({
  selector: 'cart-summary',
  template: ''
})
class MockCartSummaryComponent {
  @Input() cart: Cart;
}

@Component({
  selector: 'help-box',
  template: ''
})
class MockHelpBoxComponent {}

describe('CheckoutCartAsyncWrapper', () => {
  let component: TestCheckoutCartAsyncWrapper;
  let fixture: ComponentFixture<TestCheckoutCartAsyncWrapper>;
  let checkoutCartAsyncWrapperComponent: CheckoutCartAsyncWrapperComponent;
  let checkoutCartComponent: MockCheckoutCartComponent;
  let cartSummaryComponent: MockCartSummaryComponent;
  let helpBoxComponent: MockHelpBoxComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestCheckoutCartAsyncWrapper,
        MockCheckoutCartComponent,
        MockCartSummaryComponent,
        MockHelpBoxComponent,
        CheckoutCartAsyncWrapperComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCheckoutCartAsyncWrapper);
    component = fixture.componentInstance;
    component.cartValue$ = of(cart);
    component.loadingValue$ = of(false);
    component.cartTitleValue = stubCartTitle;
    
    checkoutCartAsyncWrapperComponent = fixture.debugElement.query(By.css('checkout-cart-async-wrapper')).componentInstance;

    fixture.detectChanges();

    checkoutCartComponent = fixture.debugElement.query(By.css('checkout-cart')).componentInstance;
    cartSummaryComponent = fixture.debugElement.query(By.css('cart-summary')).componentInstance;
    helpBoxComponent = fixture.debugElement.query(By.css('help-box')).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to take cart as input', () => {
    expect(checkoutCartAsyncWrapperComponent.cart).toEqual(cart);
  });

  it('should be able to take loading as input', () => {
    expect(checkoutCartAsyncWrapperComponent.loading).toEqual(false);
  });

  it('should be able to take cartTitle as input', () => {
    expect(checkoutCartAsyncWrapperComponent.cartTitle).toEqual(stubCartTitle);
  });

  it('should be able to take transcluded content', () => {
    expect(fixture.debugElement.query(By.css('.transcluded-content'))).not.toBeNull();
  });

  describe('on <checkout-cart>', () => {
    
    it('should set cart to value passed by cart-container directive', () => {
      expect(checkoutCartComponent.cart).toEqual(cart);
    });

    it('should set subtitle', () => {
      expect(checkoutCartComponent.subtitle).toEqual(stubCartTitle);
    });
  });

  describe('on <cart-summary>', () => {
    
    it('should set cart to value passed by the cart-container directive', () => {
      expect(cartSummaryComponent.cart).toEqual(cart);
    });
  });

  describe('when CartContainer.$loading is false', () => {
    
    it('should render <checkout-cart>', () => {
      expect(checkoutCartComponent).not.toBeNull();
    });

    it('should render <cart-summary>', () => {
      let cartSummaryComponent = fixture.debugElement.query(By.css('cart-summary'))
      expect(cartSummaryComponent).not.toBeNull();
    });

    it('should render <help-box>', () => {
      expect(helpBoxComponent).not.toBeNull();
    });

    it('should not render loading-icon', () => {
      let loadingIcon = fixture.debugElement.query(By.css('.cart-container__loading-icon'));
      
      expect(loadingIcon).toBeNull();
    });
  });

  describe('when CartContainer.$loading is true', () => {

    beforeEach(() => {
      component.loadingValue$ = of(true);
      fixture.detectChanges();
    });
    
    it('should not render <checkout-cart>', () => {
      let checkoutCartComponent = fixture.debugElement.query(By.css('cart'));

      expect(checkoutCartComponent).toBeNull();
    });

    it('should not render <cart-summary>', () => {
      let cartSummaryComponent = fixture.debugElement.query(By.css('cart-summary'));
      expect(cartSummaryComponent).toBeNull();
    });

    it('should not render <help-box>', () => {
      let helpBoxComponent = fixture.debugElement.query(By.css('help-box'));
      expect(helpBoxComponent).toBeNull();
    });

    it('should render loading-icon', () => {
      let loadingIcon = fixture.debugElement.query(By.css('.checkout-cart-async-wrapper__loading-icon'));
      
      expect(loadingIcon).not.toBeNull();
    });
  });
});