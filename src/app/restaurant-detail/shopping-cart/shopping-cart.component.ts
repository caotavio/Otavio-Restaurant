import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppinCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.shoppinCartService.items
  }

  clear() {
    this.shoppinCartService.clear()
  }

  removeItem(item: any) {
    this.shoppinCartService.removeItem(item)
  }

  addItem(item: any) {
    this.shoppinCartService.addItem(item)
  }

  total(): number {
    return this.shoppinCartService.total()
  }

}
