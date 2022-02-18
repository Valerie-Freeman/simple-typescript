/********************************* MERGING INTERFACES ***********************************/ 

// lets pretend that this interface is in an external module that we can't touch.
///////////////////////////
interface Cart {
  calculateTotal(): number
}
///////////////////////////
// We can't modify this interface directly, but we want to 
// add a couple of properties and methods to it

// To do this we create another interface with the same name and describe 
// the members we need in this interface
interface Cart {
  x: number
}

// We can create many versions of this interface, it's not just limited to two versions
// we can even overload methods
interface Cart {
  calculateTotal(options: {discountCode: number}): number
}

// This is how we implement it
let myCart: Cart = {
  x: 1,
  calculateTotal(options?: {discountCode: number}) {
    if(options && options.discountCode){
      // apply discount
    }
    return 1
  }
}

/********************************* MERGING NAMESPACE ***********************************/ 

///////////////////////////////////////
namespace MyNamespace {
  export const x: number = 10
  export interface SomeInterface {
    y: number
  }
}
///////////////////////////////////////

namespace MyNamespace {
  export const getX = () => x
  export interface SomeInterface {
    x: number
  }
}

MyNamespace.x
MyNamespace.getX()
const SomeInterface: MyNamespace.SomeInterface = {
  x: 1,
  y: 2
}

function someFunction() {
  return 10
}

namespace someFunction {
  export const someProperty = 10
}

someFunction.someProperty

// We can also use namespaces to add static members to enums
enum Vegetables {
  Tomato = "tomato",
  Onion = "onion"
}

namespace Vegetables {
  export function makeSalad() {
    return Vegetables.Tomato + Vegetables.Onion
  }
}

const salad = Vegetables.makeSalad()

// We can use a namespace to add some static members to a class that exists already
// but we can't edit it directly

class Salad {}

namespace Salad {
  export const availableSaladDressings = ['olive oil', 'ranch']
}

Salad.availableSaladDressings.includes('olive oil')

// So, declaration merging is a really useful feature when we have a need to extend 
// some type definitions that are located in some external packages or modules and we
// can't edit them directly


/********************************* HOW TO AUGMENT A MODULE ***********************************/ 

// In this example I would like to add a custom method to the React's Component class
// (install react and react-dom and their types)

// 1) cmd + click to look at type definitions
import React from 'react'
import { renderToString } from 'react-dom/server'

// 2)
declare module 'react' { // module must be same name
  interface Component { // check the type definitions to see what class you'd like to augment, same name
    helloWorld(): string
  }
}

// 3)
React.Component.prototype.helloWorld = function () { // Now the Component class has our custom function on it
  return 'Hello World'
}

// 3)
class MyComponent extends React.Component {
  render() {
    return <div>{this.helloWorld()}</div> // Now we can use our custom function
  }
}

console.log(renderToString(<MyComponent />))

// So in order to augment a module you should check the module's type definitions to see what you can 
// augment.(1) Find the definition where you need to add your functionality like in our case it was the 
// React Component interface. Then you should declare the properties and methods you'd like to implement. (2)
// And finally implement them. (3)

// We can only modify the existing functionality, we cannot add any custom exports to the module.