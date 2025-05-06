import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    })
  }

  getTotalPrice(): number {
    let total = 0;
    for(let item of this.cartItems) {
      total += item.price;
    }
    return total;
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
      this.totalPrice = 0;
    })
  }

  checkout(): void {
    this.cartService.checkoutItems(this.cartItems).subscribe(() => {
      alert('Checkout Successful!');
      this.clearCart();
    });
  }

}
