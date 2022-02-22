// Typescript provides a set of utility types which we can use to create a type which is based on some
// other type, and this new type will be transformed in some way.

/*************************************/
//  SOME TYPE + UTILITY TYPE = NEW TYPE
/*************************************/

// UTILITY TYPES: 

// Partial<T>
// Required<T>
// Readonly<T>
// Record<K, T>
// Pick<T, K>
// Omit<T, K>
// Exclude<T, U>
// Extract<T, U>
// NonNullable<T>
// ReturnType<T>
// InstanceType<T>
// ThisType<T>

/************************************************ PARTIAL ************************************************/
// Partial<T> : A generic type that takes one parameter, an Interface

interface Starship {
  name: string
  enableHyperjump: boolean
}

const updateStarship = (id: number, sharship: Partial<Starship>) => {} 
// This says the "starship" property is of Starship type, but all the properties of the starship are optional

updateStarship(1, {name: 'Explorer', enableHyperjump: true})



/************************************************ REQUIRED ************************************************/
// Required<T> : Just like partial, only opposite.

/************************************************ READONLY ************************************************/
// Readonly<T> : a generic type that takes one parameter, an Interface

interface Person {
  name: string
  age: number
  birthday: Date
}

const man: Readonly<Person> = {name: 'Caylon', age: 33, birthday: new Date('09041988')}

// man.age = 25   // Cannot assign to 'age' because it is a read-only property


/************************************************ RECORD ************************************************/
// Record<K, T> : A generic type that takes two generic type parameters, the first one is the type of the
// key (string), and the second the type of the value (number)

const aRecord: Record<string, number> = {
  apples: 20,
  oranges: 10,
  pears: 12
}


const starships: Record<string, Starship> = {
  Explorer1: {
    name: "Explorer1",
    enableHyperjump: true
  },
  Explorer2: {
    name: "Explorer2",
    enableHyperjump: false
  }
}    

/************************************************ PICK ************************************************/
// Pick<T, K> : allows us to create a new type based on some other type with only the properties 
// on the other type that we would like to have in the new type.

type StarshipNameOnly = Pick<Starship, 'name'>

/************************************************ OMIT ************************************************/
// Omit<T, K> : the opposite of Pick<T, K>

type StarshipWithoutName = Omit<Starship, 'name'>

/************************************************ EXCLUDE ************************************************/
// Exclude<T,U> : allows us to subtract one union type (U) from another one (T)

type AvailableDrinks = 'Coffee' | 'Tea' | 'Orange Juice' | 'Lemonade'

let JohnsDrink: AvailableDrinks
JohnsDrink = 'Coffee'

type DrinksJaneDoesNotLike = 'Coffee' | 'Orange Juice'
let JanesDrink: Exclude<AvailableDrinks, DrinksJaneDoesNotLike>
JanesDrink = 'Tea'

/************************************************ EXTRACT ************************************************/
// Extract<T, U> : Opposite of Exclude<T, U>

type DrinksJaneLikes = 'Tea' | 'Lemonade' | 'Coke'
let JanesNewDrink: Extract<AvailableDrinks, DrinksJaneLikes> 
// Because coke is not in the AvailableDrinks list, it is not in the new type 

/************************************************ NONNULLABLE ************************************************/
// NonNullable<T> : takes one generic type parameter (T) which should be a union type and creates a new 
// union type that is not null or undefined

interface StarshipProperties {
  color?: 'blue' | 'red' | 'green'
}

function paintStarship(id: number, color: NonNullable<StarshipProperties['color']>) {
  return {
    id,
    color
  }
}

// painStarship(1, undefined) 
// Argument of type 'undefined' is not assignable to parameter of type '"blue" | "red" | "green"'.
// As long as strictnullchecks is enabled in the ts.config

/************************************************ RETURN_TYPE ************************************************/
// ReturnType<T> : takes one generic type parameter (T) which is a type definition of a function
// and extracts the return type of the given function type

type PaintStarshipReturn = ReturnType<typeof paintStarship>


/************************************************ INSTANCE_TYPE ************************************************/
// InstanceType<T> : takes one generic type parameter <T> which should be the type of the static side of a class

// class Car {
//   deleted: boolean = false
//   delete() {}
//   constructor(public name: string) {}
// }

// class User {
//   deleted: boolean = false
//   delete() {}
//   constructor(public name: string) {}
// }

// This code is repeated. We can make it reusable like so: 

type Constructable<ClassInstance> = new (...args: any[]) => ClassInstance

function makeDeletable<BaseClass extends Constructable<{}>>(base: BaseClass) {
  return class extends base {
    deleted: boolean = false
    delete() {}
  }
}

class Car {
  constructor(public name: string) {}
}

class User {
  constructor(public name: string) {}
}

const DeletableCar = makeDeletable(Car)
const DeletableUser = makeDeletable(User)


// Now lets say we would like to add another class, the Profile, which will hold ass the data
// about the user and their car

// class Profile {
//   user: // This should hold the *Instance* of the deletable user class. We do this by using Instance Type
//   car: // same as above
// }

type DeletableUserInstance = InstanceType<typeof DeletableUser>
type DeletableCarInstance = InstanceType<typeof DeletableCar>

class Profile {
  user: DeletableUserInstance | undefined
  car: DeletableCarInstance | undefined
}

const profile = new Profile()
profile.user = new DeletableUser('John')
profile.car = new DeletableCar('Subaru')

/************************************************ THIS_TYPE ************************************************/
// ThisType<T> : acts as a marker that allows us to specify the type of 'this' keyword in an object

interface MyObject {
  sayHello(): void
}

interface MyObjectThis {
  helloWorld(): string
}

const myObject: MyObject & ThisType<MyObjectThis> = {
  sayHello() {
    return this.helloWorld()
  }
}

myObject.sayHello = myObject.sayHello.bind({
  helloWorld() {
    return 'Hello World!'
  }
})

console.log(myObject.sayHello())