import { IOrder } from "./calculate-total-abount";

export class Order implements IOrder {
  calculateTotal() {
    return 100
  }
}