type Alias1 = string | string[] | null
type Alias2 = {a: number} & {b: number}
type Alias3<T> =T[]


type Alias4 = {
  a: number
  b: number
}


// Better to use interfaces to describe the shape of an object because it actually creates a new type
// A type alias creates a name for a new type, not a new type
