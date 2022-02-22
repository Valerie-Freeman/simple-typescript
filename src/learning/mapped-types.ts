type MyProperties = 'propA' | 'propB'

// Simple
type MyMappedType = {
  [P in MyProperties]: P
}

// With generics
type MyOtherMappedType<T> = {
  [P in keyof T]: T[P] 
}
// instead of just copying, we can modify by making properties readonly, nullable, optional, etc.

type MyType = MyOtherMappedType<'thing1' | 'thing2'>
type MyNewType = MyOtherMappedType<MyProperties>
type MyOtherType = MyOtherMappedType<{a: 'a', b: 'b'}>


// Pick and Record are map types themselves.
// Here I will recreate them to show how they work

/*********************************************** PICK ***********************************************/

// Pick<T, P> takes an existing type, picks some properties from this type and creates a new type with 
// only the properties that it picked
type PickRecreated<T,Properties extends keyof T> = {
  [P in Properties]: T[P]
} 
// First generic parameter is the existing type and the second is the list of properties we 
// would like to pick from type T

type MyNewType2 = PickRecreated<{a: 'a', b: 'b', c: 'c'}, 'a' | 'c'>

type Human = Pick<{name: 'john', age: 21}, 'name'> 

/*********************************************** RECORD ***********************************************/
// Record<K, T>

type RecordRecreated<K extends keyof any, T> = {
  [P in K]: T
} 

const someRecord: RecordRecreated<string, number> = {}
someRecord.apples = 10
someRecord.oranges = 10

// But why use a record when we can use an index signature like this??
interface OtherRecord {
  [key: string]: number
}

const someOtherRecord: OtherRecord = {}
someOtherRecord.couches = 2
someOtherRecord.chairs = 3

// Index signature has a limitation as to what we can use to describe as the key.
// for example we cannot use a union:

interface Limitation {
  // [key: string | number]: number // This gives us an error
}

const myLastRecord: RecordRecreated<number | string | 'A', number> = {A: 1}
myLastRecord[1] = 1