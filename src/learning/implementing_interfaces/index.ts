import { calculateTotalAmount } from "./lib/calculate-total-abount";
import { Order } from "./lib/order";
import { ShoppingCart } from "./lib/shopping-cart";

const cart = new ShoppingCart()
console.log(`The cart's total is ${calculateTotalAmount(cart)}`)
const order = new Order()
console.log(`The order's total is ${calculateTotalAmount(order)}`)