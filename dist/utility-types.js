"use strict";
// Typescript provides a set of utility types which we can use to create a type which is based on some
// other type, and this new type will be transformed in some way.
const updateStarship = (id, sharship) => { };
// This says the "starship" property is of Starship type, but all the properties of the starship are optional
updateStarship(1, { name: 'Explorer', enableHyperjump: true });
const man = { name: 'Caylon', age: 33, birthday: new Date('09041988') };
// man.age = 25   // Cannot assign to 'age' because it is a read-only property
/************************************************ RECORD ************************************************/
// Record<K, T> : A generic type that takes two generic type parameters, the first one is the type of the
// key (string), and the second the type of the value (number)
const aRecord = {
    apples: 20,
    oranges: 10,
    pears: 12
};
const starships = {
    Explorer1: {
        name: "Explorer1",
        enableHyperjump: true
    },
    Explorer2: {
        name: "Explorer2",
        enableHyperjump: false
    }
};
let JohnsDrink;
JohnsDrink = 'Coffee';
let JanesDrink;
JanesDrink = 'Tea';
let JanesNewDrink;
function paintStarship(id, color) {
    return {
        id,
        color
    };
}
function makeDeletable(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.deleted = false;
        }
        delete() { }
    };
}
class Car {
    constructor(name) {
        this.name = name;
    }
}
class User {
    constructor(name) {
        this.name = name;
    }
}
const DeletableCar = makeDeletable(Car);
const DeletableUser = makeDeletable(User);
class Profile {
}
const profile = new Profile();
profile.user = new DeletableUser('John');
profile.car = new DeletableCar('Subaru');
const myObject = {
    sayHello() {
        return this.helloWorld();
    }
};
myObject.sayHello = myObject.sayHello.bind({
    helloWorld() {
        return 'Hellow World!';
    }
});
console.log(myObject.sayHello());
