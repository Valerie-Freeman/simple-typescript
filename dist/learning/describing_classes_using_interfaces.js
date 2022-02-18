"use strict";
class Cat {
    constructor(name) {
        this.name = name;
    }
    setGroup(group) {
        this.group = group;
    }
    meow() {
        console.log('Meeeeeeow');
    }
}
class Dog {
    constructor(name) {
        this.name = name;
    }
    setGroup(group) {
        this.group = group;
    }
    bark() {
        console.log('Bow Wow!');
    }
}
function initializeAnimal(Animal, name) {
    const animal = new Animal(name);
    animal.setGroup('mammals');
    return animal;
}
const cat = initializeAnimal(Cat, 'Felix');
const dog = initializeAnimal(Dog, 'Ava');
dog.bark();
cat.meow();
