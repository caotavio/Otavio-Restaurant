import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms'
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  postCodePattern = /(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ -]?[0-9AC-FHKNPRTV-Y]{4}$/

  orderForm: FormGroup

  delivery: number = 7 //this value should be brought from the backend, this is just an example

  orderId: string

  paymentOptions: RadioOption[] = [
    {label: 'Cash', value: 'MON'},
    {label: 'Card', value: 'DEB'}
  ]

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      postCode: this.formBuilder.control('', [Validators.required, Validators.pattern(this.postCodePattern)]),
      paymentOption: this.formBuilder.control('', [Validators.required]),
    }, {validator: OrderComponent.equalsTo})
  }

  static equalsTo(group: AbstractControl): {[Key: string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if (!email || !emailConfirmation) {
      return undefined
    }
    if (email.value !== emailConfirmation.value) {
      return {emailsDoNotMatch: true}
    }
    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = orderId
      }))
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary'])
        console.log(`Purchase completed: ${orderId}`)
        this.orderService.clear()
      })
    console.log(order)
  }

}
