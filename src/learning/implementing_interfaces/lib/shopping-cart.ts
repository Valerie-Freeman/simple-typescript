import { IOrder } from "./calculate-total-abount";

export class ShoppingCart implements IOrder {
  calculateTotal() {
    return 100
  }
}