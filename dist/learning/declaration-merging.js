"use strict";
/********************************* MERGING INTERFACES ***********************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This is how we implement it
let myCart = {
    x: 1,
    calculateTotal(options) {
        if (options && options.discountCode) {
            // apply discount
        }
        return 1;
    }
};
/********************************* MERGING NAMESPACE ***********************************/
///////////////////////////////////////
var MyNamespace;
(function (MyNamespace) {
    MyNamespace.x = 10;
})(MyNamespace || (MyNamespace = {}));
///////////////////////////////////////
(function (MyNamespace) {
    MyNamespace.getX = () => MyNamespace.x;
})(MyNamespace || (MyNamespace = {}));
MyNamespace.x;
MyNamespace.getX();
const SomeInterface = {
    x: 1,
    y: 2
};
function someFunction() {
    return 10;
}
(function (someFunction) {
    someFunction.someProperty = 10;
})(someFunction || (someFunction = {}));
someFunction.someProperty;
// We can also use namespaces to add static members to enums
var Vegetables;
(function (Vegetables) {
    Vegetables["Tomato"] = "tomato";
    Vegetables["Onion"] = "onion";
})(Vegetables || (Vegetables = {}));
(function (Vegetables) {
    function makeSalad() {
        return Vegetables.Tomato + Vegetables.Onion;
    }
    Vegetables.makeSalad = makeSalad;
})(Vegetables || (Vegetables = {}));
const salad = Vegetables.makeSalad();
// We can use a namespace to add some static members to a class that exists already
// but we can't edit it directly
class Salad {
}
(function (Salad) {
    Salad.availableSaladDressings = ['olive oil', 'ranch'];
})(Salad || (Salad = {}));
Salad.availableSaladDressings.includes('olive oil');
// So, declaration merging is a really useful feature when we have a need to extend 
// some type definitions that are located in some external packages or modules and we
// can't edit them directly
/********************************* HOW TO AUGMENT A MODULE ***********************************/
// In this example I would like to add a custom method to the React's Component class
// (install react and react-dom and their types)
// 1) cmd + click to look at type definitions
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
// 3)
react_1.default.Component.prototype.helloWorld = function () {
    return 'Hello World';
};
// 3)
class MyComponent extends react_1.default.Component {
    render() {
        return react_1.default.createElement("div", null, this.helloWorld()); // Now we can use our custom function
    }
}
console.log((0, server_1.renderToString)(react_1.default.createElement(MyComponent, null)));
// So in order to augment a module you should check the module's type definitions to see what you can 
// augment.(1) Find the definition where you need to add your functionality like in our case it was the 
// React Component interface. Then you should declare the properties and methods you'd like to implement. (2)
// And finally implement them. (3)
// We can only modify the existing functionality, we cannot add any custom exports to the module.
