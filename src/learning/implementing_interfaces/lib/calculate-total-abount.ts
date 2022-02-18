export interface IOrder {
  calculateTotal(): number
}

export function calculateTotalAmount(order: IOrder) {
  let total = order.calculateTotal()
  const discount = total * .2
  total -= discount
  const tax = total * .0925
  total += tax 
  return total
}