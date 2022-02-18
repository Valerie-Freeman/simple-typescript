// Generic Functions
function genericFunction<T>(x: T): T {
  return x
}

const genericArrowFunction = <T>(x: T): T => x
 
// Generic Interfaces
interface GenericInterface<T> {
  (a: T): T // call signature that take parameter a of type T and returns type T
  someProp: T // has some prop of type T
}

interface GenericInterface<T> {
  <U>(a: U): U 
  someProp: T
}

// Generic Classes 
class GenericClass<P> {
  constructor(public props: P) {}

  getProps(): P {
    return this.props
  }

  // static A: P // We can't use type parameters for the static side of classes, only the instance side
}

interface Perishable {
  expirationDate: Date
}
interface ChocolateCake extends Perishable {}
interface VanillaCake extends Perishable {}

const chocoCakes: ChocolateCake[] = [
  {expirationDate: new Date()}
]
const vanillaCakes: VanillaCake[] = [
  {expirationDate: new Date()}
]

const getExpiredItems = <Item extends Perishable>(items: Array<Item>) => {
  const currentDate = new Date().getTime()
  return items.filter(item => item.expirationDate.getDate() < currentDate)
}

// Or we can create it using an interface with Generic types
interface GetExpiredItemsFunction {
  <Item extends Perishable>(items: Array<Item>) : Array<Item>
}
// Now we can remove the type declarations from the implementation because ts infers them for us 
const getExpiredItems2: GetExpiredItemsFunction = (items) => {
  const currentDate = new Date().getTime()
  return items.filter(item => item.expirationDate.getDate() < currentDate)
}

const expiredVanillaCakes = getExpiredItems<VanillaCake>(vanillaCakes) // We can specify the generic type explicitly
const expiredChocoCakes = getExpiredItems(chocoCakes) // But it implies it 

interface ShoppingCart<I, P>{ // I and P can be named whatever you want
  items: Array<P>
  addItem(item: P): void
  getItemById(itemId: I): Item | undefined
}

interface Item {
  id: number
  price: number
}

const cart: ShoppingCart<number, Item> = {
  items: [],
  addItem(item) {
    this.items.push(item)
  },
  getItemById(id) {
    return this.items.find(item => item.id === id)
  }
}
