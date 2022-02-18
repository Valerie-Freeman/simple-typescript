"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalAmount = void 0;
function calculateTotalAmount(order) {
    let total = order.calculateTotal();
    const discount = total * .2;
    total -= discount;
    const tax = total * .0925;
    total += tax;
    return total;
}
exports.calculateTotalAmount = calculateTotalAmount;
