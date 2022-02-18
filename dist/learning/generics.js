"use strict";
// Generic Functions
function genericFunction(x) {
    return x;
}
const genericArrowFunction = (x) => x;
// Generic Classes 
class GenericClass {
    constructor(props) {
        this.props = props;
    }
    getProps() {
        return this.props;
    }
}
const chocoCakes = [
    { expirationDate: new Date() }
];
const vanillaCakes = [
    { expirationDate: new Date() }
];
const getExpiredItems = (items) => {
    const currentDate = new Date().getTime();
    return items.filter(item => item.expirationDate.getDate() < currentDate);
};
// Now we can remove the type declarations from the implementation because ts infers them for us 
const getExpiredItems2 = (items) => {
    const currentDate = new Date().getTime();
    return items.filter(item => item.expirationDate.getDate() < currentDate);
};
const expiredVanillaCakes = getExpiredItems(vanillaCakes); // We can specify the generic type explicitly
const expiredChocoCakes = getExpiredItems(chocoCakes); // But it implies it 
const cart = {
    items: [],
    addItem(item) {
        this.items.push(item);
    },
    getItemById(id) {
        return this.items.find(item => item.id === id);
    }
};
