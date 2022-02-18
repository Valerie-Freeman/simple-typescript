/*********************************** MODULES **********************************/

import multiply, {multiplyByTwo as mBy2} from './multiply'

const a = 4
const b = 4

console.log(`${a} * ${b} = ${multiply(a, b)}`)

/*********************************** TYPES **********************************/

// If using a union type for parameter, you must check that the parameter value 
// is not null before indexing into it...
const uppercaseFirstLetter = (str: string | null) => {
  if (str) {
    return str[0].toUpperCase() + str.substring(1)
  }
}

// Or this
const returnName = (person: {name: string, age: number} | null) => {
  return person?.name
}

// Some example of what happens if you pass null and how to handle it
console.log(uppercaseFirstLetter('valerie'))
console.log(returnName(null))
console.log((returnName(null)) ? "true" : "false")
console.log(returnName({name: uppercaseFirstLetter('valerie') ?? 'No name', age: 25}))
console.log(returnName({name: uppercaseFirstLetter(null) ?? 'No name', age: 25}))

// Primitive Types and Non-primitive types
type primitiveTypes = boolean | number | string | symbol | null | undefined
// Other types are considered non-primitive. In Typescript there is a special type to 
// describe non primitive types. It's called object.

// If you try to assign a primitive value to this type, ts will give us an error
const myObj: object = []
// we can only assign non primitive types like an array, object, map, etc

// Void
function log(message: string): void {
  console.log(message)
}
// if we try to return something, ts will warn us

// Array
// There are two ways to type an array
let array1: number[] = [1,2,3]
let array2: Array<number> = array1

// Tuple
// A fixed number of elements
let tuple: [string, number] = ['str', 1]

// Enum
enum Color {
  Red = 2,
  Green = 5, 
  Blue  = 'blue'
}

let myFavoriteColor: Color = Color.Blue;
console.log(Color.Red, Color.Green, Color.Blue)
console.log(Color[5])

// Any
// You can assign anything you like to any
let ANY: any
ANY = 'a string'
ANY = 2
ANY = false

// Type Assertions
// const email = document.getElementById('email')
// if(email) {
//   email.addEventListener('change', e => {
//     const input = e.currentTarget as HTMLInputElement  // We did this type assertion because value does on exist on Event Target
//     // const input = <HTMLInputElement>e.currentTarget   We can also do it this way, but not in a tsx file
//     console.log(input.value)
//   })
// }

/*********************************** INTERFACES **********************************/

interface A {
  someProp: number
}

interface B {
  someProp: number
}

let interfaceA: A = { someProp: 1}
let interfaceB: B = interfaceA

interface Profile {
  readonly name: string
  age?: number
}

let profile: Profile = {
  name: 'Val',
}

// Since name is readonly, we cannot modify it after it's already been created
// profile.name = 'Cage'

// Index Signature
interface InterfaceX {
  [key: string]: number | string
}

// Since objectA is of type InterfaceX, we can give it as many properties we like 
// as long as it follows the index signature
const objectA: InterfaceX = {}
objectA.x = 1
objectA.y = "three"
// objectA.z = false   type boolean is not assignable to type number | string

// Call Signature
interface Sum {
  (a: number, b: number): number
  prop1: string 
}
const sum: Sum = (a, b) => a + b
sum.prop1 = 'some prop'

// Extending Interfaces

interface Parent {
  x: string
}

interface Parent2 {
  y: string
}

interface Parent3 {
  z: string
}

interface Child extends Parent, Parent2, Parent3 {}

let child: Child = {x: 'some prop', y: 'another prop', z: 'last prop'}

/*********************************** FUNCTIONS **********************************/

// Optional and default parameters
function sumSomeThings(a: number, b: number = 0): number {
  return a + b
}

sumSomeThings(1)

type MyFunc = (a: number, b: number) => number
const sum2: MyFunc = (a, b) => a + b

// Unknown number of arguments
function sumEverything(arg1: string, arg2: boolean, ...numbers: number[]): number {
  return numbers.reduce((result, num) => result + num, 0)
}

sumEverything('Hi', true, 3, 4, 5, 6, 7)

// Overloads

function calcArea(width: number, height: number): number
function calcArea(length: number): number
function calcArea(...args: number[]): number {
  if (args.length === 2 ) {
    return args[0] * args[1]
  }
  return Math.pow(args[0], 2)
}

calcArea(3, 4)
calcArea(3)

/*********************************** CLASSES **********************************/
class Robot {
  private _color: string | undefined

  static availableColors = ['Green', 'Yellow']
  static isColorAvailable(color: string) {
    return Robot.availableColors.includes(color)
  }

  // protected name: string
  
  // constructor(name: string) {
  //   this.name = name
  // }

  // A more simple way to do what's above
  constructor(protected _name: string) {}

  askName() {
    console.log(`My name is ${this.name}`)
  }

  move(distance: number) {
    console.log(`${this.name} moved ${distance} meters`)
  }

  set name(value: string) {
    this._name = 'PREFIX_' + value
  }

  get name() {
    return this._name +'_SUFFIX'
  }

  set color(color: string) {
    if (!Robot.isColorAvailable(color)) {
      throw new Error(`Color ${color} is not available`) // We can only access static members on the class itself, never an instance of the class
    }
    this._color = color
  }

  get color() {
    return this._color || 'No color'
  }
}

class FlyingRobot extends Robot {
  private readonly jetpackSize: number 

  constructor(name: string, jetpackSize: number) {
    super(name) // super refers to the constructor of the parent class
    this.jetpackSize = jetpackSize
  }

  move(distance: number) {
    console.log(`${this.name} is flying`)
    super.move(distance)  
    // this.jetpackSize = 4 // jetpackSize is readonly, therefore it can only be set onc
  }
}

const robot = new Robot('John')
robot.askName()

const flyingRobot = new FlyingRobot('Jim', 2)
flyingRobot.move(10)
// console.log(`Flying robot's jetpack size is ${flyingRobot.jetpackSize}`) // Property jetpackSize is private, cannot access outside of class

flyingRobot.name = 'Kevin'
console.log(`My name is ${flyingRobot.name}`)

console.log(`robot's color is ${robot.color}`)

robot.color = 'Green'
console.log(`robot's color is ${robot.color}`)

// robot.color = "Blue" // Throws error

/*********************************** ECMA SCRIPT PRIVATE FIELDS **********************************/

class Man {
  #name: string
  #age: number
  private somePrivateField = 'This is private'

  constructor(name: string, age: number) {
    this.#name = name
    this.#age = age
  }

  getName() {
    return this.#name
  }
  // you can't access a private field outside of a containing class, 
  // also you can't access a private field that belongs to a parent class from a subclass
}


class BusinessMan extends Man {
  #name: string
  // private somePrivateField = 'OVERRIDEN PRIVATE FIELD'

  constructor(name: string, age: number) {
    super(name, age)
    this.#name = `Business ${name}`
  }

  getBusinessManName() {
    return this.#name
  }
}

const man = new BusinessMan('Jack', 32)

console.log(`parent name ${man.getName()}`)
console.log(`subclass name ${man.getBusinessManName()
}`)


/*********************************** PRIVATE VS # **********************************/

// It's better to use ECMA Script's # private key
// console.log('private', man.somePrivateField) 
// Even though is shows a compilation error, the code still runs cause it compiles to JS
// It can also be overridden in a subclass (shown above)

// console.log('#', man.#age) 
// Truly private and throws and error. Cannot be overridden as shown above with #name