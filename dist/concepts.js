"use strict";
/*********************************** MODULES **********************************/
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
var _Man_name, _Man_age, _BusinessMan_name;
Object.defineProperty(exports, "__esModule", { value: true });
const multiply_1 = __importDefault(require("./multiply"));
const a = 4;
const b = 4;
console.log(`${a} * ${b} = ${(0, multiply_1.default)(a, b)}`);
/*********************************** TYPES **********************************/
// If using a union type for parameter, you must check that the parameter value 
// is not null before indexing into it...
const uppercaseFirstLetter = (str) => {
    if (str) {
        return str[0].toUpperCase() + str.substring(1);
    }
};
// Or this
const returnName = (person) => {
    return person === null || person === void 0 ? void 0 : person.name;
};
// Some example of what happens if you pass null and how to handle it
console.log(uppercaseFirstLetter('valerie'));
console.log(returnName(null));
console.log((returnName(null)) ? "true" : "false");
console.log(returnName({ name: (_a = uppercaseFirstLetter('valerie')) !== null && _a !== void 0 ? _a : 'No name', age: 25 }));
console.log(returnName({ name: (_b = uppercaseFirstLetter(null)) !== null && _b !== void 0 ? _b : 'No name', age: 25 }));
// Other types are considered non-primitive. In Typescript there is a special type to 
// describe non primitive types. It's called object.
// If you try to assign a primitive value to this type, ts will give us an error
const myObj = [];
// we can only assign non primitive types like an array, object, map, etc
// Void
function log(message) {
    console.log(message);
}
// if we try to return something, ts will warn us
// Array
// There are two ways to type an array
let array1 = [1, 2, 3];
let array2 = array1;
// Tuple
// A fixed number of elements
let tuple = ['str', 1];
// Enum
var Color;
(function (Color) {
    Color[Color["Red"] = 2] = "Red";
    Color[Color["Green"] = 5] = "Green";
    Color["Blue"] = "blue";
})(Color || (Color = {}));
let myFavoriteColor = Color.Blue;
console.log(Color.Red, Color.Green, Color.Blue);
console.log(Color[5]);
// Any
// You can assign anything you like to any
let ANY;
ANY = 'a string';
ANY = 2;
ANY = false;
let interfaceA = { someProp: 1 };
let interfaceB = interfaceA;
let profile = {
    name: 'Val',
};
// Since objectA is of type InterfaceX, we can give it as many properties we like 
// as long as it follows the index signature
const objectA = {};
objectA.x = 1;
objectA.y = "three";
const sum = (a, b) => a + b;
sum.prop1 = 'some prop';
let child = { x: 'some prop', y: 'another prop', z: 'last prop' };
/*********************************** FUNCTIONS **********************************/
// Optional and default parameters
function sumSomeThings(a, b = 0) {
    return a + b;
}
sumSomeThings(1);
const sum2 = (a, b) => a + b;
// Unknown number of arguments
function sumEverything(arg1, arg2, ...numbers) {
    return numbers.reduce((result, num) => result + num, 0);
}
sumEverything('Hi', true, 3, 4, 5, 6, 7);
function calcArea(...args) {
    if (args.length === 2) {
        return args[0] * args[1];
    }
    return Math.pow(args[0], 2);
}
calcArea(3, 4);
calcArea(3);
/*********************************** CLASSES **********************************/
class Robot {
    // protected name: string
    // constructor(name: string) {
    //   this.name = name
    // }
    // A more simple way to do what's above
    constructor(_name) {
        this._name = _name;
    }
    static isColorAvailable(color) {
        return Robot.availableColors.includes(color);
    }
    askName() {
        console.log(`My name is ${this.name}`);
    }
    move(distance) {
        console.log(`${this.name} moved ${distance} meters`);
    }
    set name(value) {
        this._name = 'PREFIX_' + value;
    }
    get name() {
        return this._name + '_SUFFIX';
    }
    set color(color) {
        if (!Robot.isColorAvailable(color)) {
            throw new Error(`Color ${color} is not available`); // We can only access static members on the class itself, never an instance of the class
        }
        this._color = color;
    }
    get color() {
        return this._color || 'No color';
    }
}
Robot.availableColors = ['Green', 'Yellow'];
class FlyingRobot extends Robot {
    constructor(name, jetpackSize) {
        super(name); // super refers to the constructor of the parent class
        this.jetpackSize = jetpackSize;
    }
    move(distance) {
        console.log(`${this.name} is flying`);
        super.move(distance);
        // this.jetpackSize = 4 // jetpackSize is readonly, therefore it can only be set onc
    }
}
const robot = new Robot('John');
robot.askName();
const flyingRobot = new FlyingRobot('Jim', 2);
flyingRobot.move(10);
// console.log(`Flying robot's jetpack size is ${flyingRobot.jetpackSize}`) // Property jetpackSize is private, cannot access outside of class
flyingRobot.name = 'Kevin';
console.log(`My name is ${flyingRobot.name}`);
console.log(`robot's color is ${robot.color}`);
robot.color = 'Green';
console.log(`robot's color is ${robot.color}`);
// robot.color = "Blue" // Throws error
/*********************************** ECMA SCRIPT PRIVATE FIELDS **********************************/
class Man {
    constructor(name, age) {
        _Man_name.set(this, void 0);
        _Man_age.set(this, void 0);
        this.somePrivateField = 'This is private';
        __classPrivateFieldSet(this, _Man_name, name, "f");
        __classPrivateFieldSet(this, _Man_age, age, "f");
    }
    getName() {
        return __classPrivateFieldGet(this, _Man_name, "f");
    }
}
_Man_name = new WeakMap(), _Man_age = new WeakMap();
class BusinessMan extends Man {
    constructor(name, age) {
        super(name, age);
        _BusinessMan_name.set(this, void 0);
        this.somePrivateField = 'OVERRIDEN PRIVATE FIELD';
        __classPrivateFieldSet(this, _BusinessMan_name, `Business ${name}`, "f");
    }
    getBusinessManName() {
        return __classPrivateFieldGet(this, _BusinessMan_name, "f");
    }
}
_BusinessMan_name = new WeakMap();
const man = new BusinessMan('Jack', 32);
console.log(`parent name ${man.getName()}`);
console.log(`subclass name ${man.getBusinessManName()}`);
/*********************************** PRIVATE VS # **********************************/
// It's better to use ECMA Script's # private key
console.log('private', man.somePrivateField);
// Even though is shows a compilation error, the code still runs cause it compiles to JS
// It can also be overridden in a subclass (shown above)
// console.log('#', man.#age) 
// Truly private and throws and error. Cannot be overridden as shown above with #name
