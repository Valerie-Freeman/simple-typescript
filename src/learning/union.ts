function someFn(myArgument: number | string | boolean) {
  if(typeof myArgument === 'string') {
    let x = myArgument.toUpperCase()
  } else if (typeof myArgument === 'number') {
    myArgument.toFixed()
  } else {
    myArgument
  }
}

interface Dog {
  bark(): void
  walk(): void
}

interface Cat {
  meow(): void
  walk(): void
}

// Custom type guard checks is some variable is of a give type 
// (not a primitive type cause we could just use typeof then)
function isDog(someObj: Dog | Cat): someObj is Dog {
  return (<Dog>someObj).bark !== undefined
}

function callMyPet(pet: Dog | Cat) {
  pet.walk()
  if(isDog(pet)) {
    pet.bark()
  } else {
    pet.meow()
  }
}

class Foo {
 foo: number | undefined 
 commonProp: string | undefined 
}

class Bar {
  bar: number | undefined
  commonProp: string | undefined
}

function fooBarFunction(obj: Foo | Bar) {
  if (obj instanceof Foo) {
    obj.foo
  } else {
    obj.bar
  }
}