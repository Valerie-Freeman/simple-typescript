"use strict";
function someFn(myArgument) {
    if (typeof myArgument === 'string') {
        let x = myArgument.toUpperCase();
    }
    else if (typeof myArgument === 'number') {
        myArgument.toFixed();
    }
    else {
        myArgument;
    }
}
// Custom type guard checks is some variable is of a give type 
// (not a primitive type cause we could just use typeof then)
function isDog(someObj) {
    return someObj.bark !== undefined;
}
function callMyPet(pet) {
    pet.walk();
    if (isDog(pet)) {
        pet.bark();
    }
    else {
        pet.meow();
    }
}
class Foo {
}
class Bar {
}
function fooBarFunction(obj) {
    if (obj instanceof Foo) {
        obj.foo;
    }
    else {
        obj.bar;
    }
}
