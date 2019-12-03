# xiter - E**x**tended **iter**ables

Extensions of ES6 iterables such as `Set`.

## Problem

Many iterables (such as `Set`, for instance) lack methods supporting common iterator operations (such as `map`, `filter`, `every`, etc.).

`Array` is the only iterable that currently provides all these methods. Consequently, in order to perform one of these operations on a non-`Array` iterable, one must convert the iterable into an `Array`, perform the operation, and convert it back to the original type of iterable.

For example, suppose you had the following `Set` and mapper function:

```typescript
const original: Set<string> = ...;
function mapper(s: string): number { ... }
```

Ideally, you would be able to write:

```typescript
const mapped = original.map(mapper);
```

...but in reality, you have to write:

```typescript
const mapped = new Set(Array.from(original).map(mapper));
```

Notice how much more readable the former is. If your codebase frequently performs these iterator operations, readability improvements like these will quickly add up.

Unfortunately, the former currently throws an error, because the native `Set` does not provide a `map` method.

## Solution

`xiter` provides thorougly tested and documented extensions of native iterables that provide these methods.

These extensions are _fully backwards-compatible_, allowing you to confidently replace any native iterables with their extended counterparts without fear of breaking your codebase.

## Usage

```bash
npm install --save xiter
```

```typescript
import { XSet } from "xiter";

const a = new XSet(["x", "y", "z"]);
const b = new XSet([8, "z", false]);

function printSet(s: Set<any>): void {
  console.log(Array.from(s));
}

// XSets behave like native Sets...

console.log(a instanceof Set); // true
console.log(a.has("z"), a.has("w")); // true, false;
console.log(a.delete("z"), a.delete("z")); // true, false
a.add("z");
console.log(a.size); // 3

// ...but have additional methods you would expect all iterables to have (e.g., map)...

printSet(a.map(s => s.toUpperCase())); // ["X", "Y", "Z"]
printSet(b.filter(x => "number" === typeof x)); // [8]
console.log(b.find(x => "number" === typeof x); // 8
console.log(b.some(x => "number" === typeof x); // true
console.log(b.every(x => "number" === typeof x); // false

// See API Docs for the rest of the methods.
```

## API Docs

Docs can be found [here](https://kylejlin.github.io/xiter/).

## ("Bonus") class-specific methods

As a bonus, some extensions provide additional class-specific methods for your convenience. For example, `XSet` provides methods implementing common set operations, such as `union` and `isSubsetOf`.

These methods, despite being completely unrelated to solving the original problem of providing iterator operations, were included as a part of this library because the author believed there is a reasonable chance that users of the given iterables would want to perform these class-specific operations in addition to the iterator operations.

## Roadmap

- ~~`XSet`~~ provided as of [v1.0.0](https://github.com/kylejlin/xiter/releases/tag/v1.0.0)
- `XMap`
- `XWeakSet`?
- `XWeakMap`?

## License

MIT

Copyright (c) 2019 Kyle Lin
