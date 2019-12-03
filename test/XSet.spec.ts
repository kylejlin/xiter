import { XSet } from "../src/index";

test("calling new XSet() with no arguments creates an empty set", () => {
  const s = new XSet();

  expect(s.toArray()).toEqual([]);
});

test("calling new XSet(elements) creates a set with the provided elements", () => {
  const s = new XSet(["foo", 42, null]);

  expect(s.toArray()).toEqual(["foo", 42, null]);
});

test("XSet instances are instances of XSet", () => {
  const s = new XSet(["foo", 42, null]);

  expect(s instanceof XSet).toBe(true);
});

test("XSet instances are instances of Set", () => {
  const s = new XSet(["foo", 42, null]);

  expect(s instanceof Set).toBe(true);
});

test("XSet.prototype.add() adds a new element", () => {
  const s: XSet<string | number> = new XSet(["foo"]);

  s.add(42);

  expect(s.toArray()).toEqual(["foo", 42]);
});

test("XSet.prototype.add() returns the set", () => {
  const s: XSet<string | number> = new XSet(["foo"]);

  expect(s.add(42)).toBe(s);
});

test("XSet.prototype.add() does not add a duplicate element", () => {
  const s: XSet<string> = new XSet(["foo"]);

  s.add("foo");

  expect(s.toArray()).toEqual(["foo"]);
});

test("XSet.prototype.clear() removes all elements", () => {
  const s: XSet<string | number> = new XSet(["foo", 42]);

  s.clear();

  expect(s.toArray()).toEqual([]);
});

test("XSet.prototype.delete() deletes an existing element and returns true", () => {
  const s: XSet<string | number> = new XSet(["foo", 42]);

  expect(s.delete("foo")).toBe(true);
  expect(s.toArray()).toEqual([42]);
});

test("XSet.prototype.delete() returns false if an element is not in the set", () => {
  const s: XSet<string | number> = new XSet(["foo"]);

  expect(s.delete(42)).toBe(false);
  expect(s.toArray()).toEqual(["foo"]);
});

test("XSet.prototype.forEach() calls the callback with the set's elements, in insertion order", () => {
  const s: XSet<string | number> = new XSet(["foo", 42, "bar"]);
  const cb = jest.fn(() => {});

  s.forEach(cb);

  expect(cb.mock.calls).toEqual([
    ["foo", "foo", s],
    [42, 42, s],
    ["bar", "bar", s],
  ]);
});

test("XSet.prototype.has() determines if the set has an element", () => {
  const s: XSet<string | number> = new XSet(["foo", 42, "bar"]);

  expect(s.has("foo")).toBe(true);
  expect(s.has(42)).toBe(true);
  expect(s.has(9)).toBe(false);
});

test("XSet.prototype.size", () => {
  expect(new XSet().size).toBe(0);
  expect(new XSet([]).size).toBe(0);
  expect(new XSet(["foo"]).size).toBe(1);
  expect(new XSet(["foo", "foo"]).size).toBe(1);
  expect(new XSet(["foo", 42, false]).size).toBe(3);
});

test("XSet.prototype[Symbol.iterator]() iterates over elements in insertion order", () => {
  expect(Array.from(new XSet(["foo", 42, 9]))).toEqual(["foo", 42, 9]);
});

test("XSet.prototype.entries() yields the entries in insertion order", () => {
  const s = new XSet(["foo", 42, 9]);

  expect(Array.from(s.entries())).toEqual([
    ["foo", "foo"],
    [42, 42],
    [9, 9],
  ]);
});

test("XSet.prototype.keys() yields the elements in insertion order", () => {
  const s = new XSet(["foo", 42, 9]);

  expect(Array.from(s.keys())).toEqual(["foo", 42, 9]);
});

test("XSet.prototype.values() yields the elements in insertion order", () => {
  const s = new XSet(["foo", 42, 9]);

  expect(Array.from(s.values())).toEqual(["foo", 42, 9]);
});

test("XSet.prototype[Symbol.toStringTag] is Set", () => {
  const s = new XSet(["foo", 42, 9]);

  expect(s[Symbol.toStringTag]).toBe("Set");
});

test("XSet.prototype.toArray() returns an array of the elements in insertion order", () => {
  const s = new XSet(["foo", 42, 9]);

  expect(s.toArray()).toEqual(["foo", 42, 9]);
});

test("XSet.prototype.addAll() adds all the elements", () => {
  const s = new XSet(["foo", 42, 9]);

  s.addAll([42, "bar", 6]);

  expect(s.toArray()).toEqual(["foo", 42, 9, "bar", 6]);
});

test("XSet.prototype.addAll() returns the set", () => {
  const s = new XSet(["foo", 42, 9]);

  expect(s.addAll([42, "bar", 6])).toBe(s);
});

test("XSet.prototype.deleteAll() deletes all the provided elements", () => {
  const s = new XSet(["foo", 42, 9]);

  s.deleteAll([42, "bar", 6]);

  expect(s.toArray()).toEqual(["foo", 9]);
});

test("XSet.prototype.map() calls the provided callback for each element in insertion order and returns results", () => {
  const s = new XSet(["foo", -2, 9, 2]);
  const cb = jest.fn(x => x * x);

  const s1 = s.map(cb);

  expect(cb.mock.calls).toEqual([
    ["foo", "foo", s],
    [-2, -2, s],
    [9, 9, s],
    [2, 2, s],
  ]);
  expect(s1.toArray()).toEqual([NaN, 4, 81]);
});

test("XSet.prototype.map() uses the thisArg correctly", () => {
  const s = new XSet(["foo", -2, 9, 2]);

  const receivedThisArgs: any[] = [];

  function cb(this: any) {
    receivedThisArgs.push(this);
  }

  const thisArg = { bar: "baz" };

  s.map(cb, thisArg);

  expect(receivedThisArgs).toEqual([thisArg, thisArg, thisArg, thisArg]);
});

test("XSet.prototype.filter() calls the provided callback for each element in insertion order and returns the set of the elements satisfying the predicate", () => {
  const s = new XSet(["foo", -2, 9, 2]);

  function isPositiveNum(x: unknown): x is number {
    return "number" === typeof x && x > 0;
  }

  const cb = jest.fn(isPositiveNum);

  const s1 = s.filter(cb);

  expect(cb.mock.calls).toEqual([
    ["foo", "foo", s],
    [-2, -2, s],
    [9, 9, s],
    [2, 2, s],
  ]);
  expect(s1.toArray()).toEqual([9, 2]);
});

test("XSet.prototype.filter() uses the thisArg correctly", () => {
  const s = new XSet(["foo", -2, 9, 2]);

  const receivedThisArgs: any[] = [];

  function isPositiveNum(this: any, x: unknown): x is number {
    receivedThisArgs.push(this);
    return "number" === typeof x && x > 0;
  }

  const thisArg = { bar: "baz" };

  s.filter(isPositiveNum, thisArg);

  expect(receivedThisArgs).toEqual([thisArg, thisArg, thisArg, thisArg]);
});

test("XSet.prototype.reduce() uses the initialValue as the initial acc if it is provided", () => {
  const s = new XSet(["foo", -2, 9, 2]);

  const cb = jest.fn((a, b) => a + b);

  const result = s.reduce(cb, false);

  expect(result).toBe("falsefoo-292");
  expect(cb.mock.calls).toEqual([
    [false, "foo", "foo", s],
    ["falsefoo", -2, -2, s],
    ["falsefoo-2", 9, 9, s],
    ["falsefoo-29", 2, 2, s],
  ]);
});

test("XSet.prototype.reduce() uses the set's first element (i.e., that which was inserted first) as the initial acc if no initialValue is provided", () => {
  const s = new XSet(["foo", -2, 9, 2]);

  const cb = jest.fn((a, b) => a + b);

  const result = s.reduce(cb);

  expect(result).toBe("foo-292");
  expect(cb.mock.calls).toEqual([
    ["foo", -2, -2, s],
    ["foo-2", 9, 9, s],
    ["foo-29", 2, 2, s],
  ]);
});

test("XSet.prototype.reduce() throws TypeError if set is empty and no initialValue is provided", () => {
  const s: XSet<string | boolean | number> = new XSet();

  const cb = jest.fn((a, b) => a + b);

  let result: (string | boolean | number) | undefined;
  let error: Error | undefined;

  try {
    result = s.reduce(cb);
  } catch (e) {
    error = e;
  }

  expect(result).toBe(undefined);
  expect(error).toBeInstanceOf(TypeError);
  expect(cb.mock.calls).toEqual([]);
});

test("XSet.prototype.every() calls the predicate on each element in insertion order and determines whether the predicate returns true for every element", () => {
  const s = new XSet(["foo", -5, true, 2]);

  const isTruthy = jest.fn(x => !!x);
  const isNumber = jest.fn(x => typeof x === "number");

  expect(s.every(isTruthy)).toBe(true);
  expect(isTruthy.mock.calls).toEqual([
    ["foo", "foo", s],
    [-5, -5, s],
    [true, true, s],
    [2, 2, s],
  ]);

  expect(s.every(isNumber)).toBe(false);
  expect(isNumber.mock.calls).toEqual([["foo", "foo", s]]);
});

test("XSet.prototype.every() returns true if the set is empty", () => {
  const s = new XSet();

  const alwaysFalse = jest.fn(() => false);

  expect(s.every(alwaysFalse)).toBe(true);
});

test("XSet.prototype.every() uses the thisArg correctly", () => {
  const s = new XSet(["foo", -2, 9, 2]);

  const receivedThisArgs: any[] = [];

  function alwaysTrue(this: any): true {
    receivedThisArgs.push(this);
    return true;
  }

  const thisArg = { bar: "baz" };

  s.every(alwaysTrue, thisArg);

  expect(receivedThisArgs).toEqual([thisArg, thisArg, thisArg, thisArg]);
});

test("XSet.prototype.some() calls the predicate on each element in insertion order and determines whether the predicate returns true for at least one element", () => {
  const s = new XSet(["foo", -5, true, 2]);

  const isFalsy = jest.fn(x => !x);
  const isNumber = jest.fn(x => typeof x === "number");

  expect(s.some(isFalsy)).toBe(false);
  expect(isFalsy.mock.calls).toEqual([
    ["foo", "foo", s],
    [-5, -5, s],
    [true, true, s],
    [2, 2, s],
  ]);

  expect(s.some(isNumber)).toBe(true);
  expect(isNumber.mock.calls).toEqual([
    ["foo", "foo", s],
    [-5, -5, s],
  ]);
});

test("XSet.prototype.some() returns false if the set is empty", () => {
  const s = new XSet();

  const alwaysTrue = jest.fn(() => true);

  expect(s.some(alwaysTrue)).toBe(false);
});

test("XSet.prototype.some() uses the thisArg correctly", () => {
  const s = new XSet(["foo", -2, 9, 2]);

  const receivedThisArgs: any[] = [];

  function alwaysFalse(this: any): false {
    receivedThisArgs.push(this);
    return false;
  }

  const thisArg = { bar: "baz" };

  s.some(alwaysFalse, thisArg);

  expect(receivedThisArgs).toEqual([thisArg, thisArg, thisArg, thisArg]);
});

test("XSet.prototype.find() calls the predicate on each element in insertion order and returns the first element that satisfies the predicate, or undefined if no elements satisfy the predicate", () => {
  const s = new XSet(["foo", -5, true, 2]);

  const isFalsy = jest.fn(x => !x);
  const isNumber = jest.fn(x => typeof x === "number");

  expect(s.find(isFalsy)).toBe(undefined);
  expect(isFalsy.mock.calls).toEqual([
    ["foo", "foo", s],
    [-5, -5, s],
    [true, true, s],
    [2, 2, s],
  ]);

  expect(s.find(isNumber)).toBe(-5);
  expect(isNumber.mock.calls).toEqual([
    ["foo", "foo", s],
    [-5, -5, s],
  ]);
});

test("XSet.prototype.find() returns undefined if the set is empty", () => {
  const s = new XSet();

  const alwaysTrue = jest.fn(() => true);

  expect(s.find(alwaysTrue)).toBe(undefined);
});

test("XSet.prototype.find() uses the thisArg correctly", () => {
  const s = new XSet(["foo", -2, 9, 2]);

  const receivedThisArgs: any[] = [];

  function alwaysFalse(this: any): false {
    receivedThisArgs.push(this);
    return false;
  }

  const thisArg = { bar: "baz" };

  s.some(alwaysFalse, thisArg);

  expect(receivedThisArgs).toEqual([thisArg, thisArg, thisArg, thisArg]);
});

test("XSet.prototype.flat() returns a union of the set's sets", () => {
  const setOfSets = new XSet([
    new XSet(["a", "c"]),
    new XSet(),
    new XSet([9, "a", false]),
    new XSet(["c", "b"]),
  ]);

  expect(setOfSets.flat().toArray()).toEqual(["a", "c", 9, false, "b"]);
});

test("XSet.prototype.clone() returns a new set containing all this set's elements", () => {
  const original = new XSet(["foo", false, 9, -4]);

  const clone = original.clone();

  expect(clone.toArray()).toEqual(original.toArray());
  expect(clone).not.toBe(original);
});

test("XSet.prototype.union() returns the set of elements that are in either set", () => {
  const left = new XSet(["foo", true, 9]);
  const right = new XSet([4, "foo", "bar", true]);

  const union = left.union(right);

  expect(union.toArray()).toEqual(["foo", true, 9, 4, "bar"]);
});

test("XSet.prototype.intersection() returns the set of elements that are in both sets", () => {
  const left = new XSet(["foo", true, 9]);
  const right = new XSet([4, "foo", "bar", true]);

  const intersection = left.intersection(right);

  expect(intersection.toArray()).toEqual(["foo", true]);
});

test("XSet.prototype.difference() returns the set of elements that are in this set but not the provided set", () => {
  const left = new XSet(["foo", true, 9]);
  const right = new XSet([4, "foo", "bar", true]);

  const difference = left.difference(right);

  expect(difference.toArray()).toEqual([9]);
});

test("XSet.prototype.xor() returns the set of elements that are in exactly one of the two sets", () => {
  const left = new XSet(["foo", true, 9]);
  const right = new XSet([4, "foo", "bar", true]);

  const symmetricDifference = left.xor(right);

  expect(symmetricDifference.toArray()).toEqual([9, 4, "bar"]);
});

test("XSet.prototype.isSubsetOf() determines whether every element of this set is an element of the provided set", () => {
  const a = new XSet(["foo", true, 9]);
  const eqA = new XSet([true, "foo", 9]);
  const supA = new XSet(["foo", "bar", true, 9]);
  const notSupA = new XSet([true, 9, "bar"]);

  expect(a.isSubsetOf(a)).toBe(true);
  expect(a.isSubsetOf(eqA)).toBe(true);
  expect(a.isSubsetOf(supA)).toBe(true);
  expect(a.isSubsetOf(notSupA)).toBe(false);
});

test("XSet.prototype.isSubsetOf() returns true if both sets are empty", () => {
  const a = new XSet();
  const eqA = new XSet();

  expect(a.isSubsetOf(a)).toBe(true);
  expect(a.isSubsetOf(eqA)).toBe(true);
});

test("XSet.prototype.isProperSubsetOf() determines whether every element of this set is an element of the provided set and that the sets aren't equal", () => {
  const a = new XSet(["foo", true, 9]);
  const eqA = new XSet([true, "foo", 9]);
  const supA = new XSet(["foo", "bar", true, 9]);
  const notSupA = new XSet([true, 9, "bar"]);

  expect(a.isProperSubsetOf(a)).toBe(false);
  expect(a.isProperSubsetOf(eqA)).toBe(false);
  expect(a.isProperSubsetOf(supA)).toBe(true);
  expect(a.isProperSubsetOf(notSupA)).toBe(false);
});

test("XSet.prototype.isSupersetOf() determines whether every element of the provided set is an element of the this set", () => {
  const a = new XSet(["foo", true, 9]);
  const eqA = new XSet([true, "foo", 9]);
  const subA = new XSet([true, 9]);
  const notSubA = new XSet([9, "bar"]);

  expect(a.isSupersetOf(a)).toBe(true);
  expect(a.isSupersetOf(eqA)).toBe(true);
  expect(a.isSupersetOf(subA)).toBe(true);
  expect(a.isSupersetOf(notSubA)).toBe(false);
});

test("XSet.prototype.isSupersetOf() returns true if both sets are empty", () => {
  const a = new XSet();
  const eqA = new XSet();

  expect(a.isSupersetOf(a)).toBe(true);
  expect(a.isSupersetOf(eqA)).toBe(true);
});

test("XSet.prototype.isProperSupersetOf() determines whether every element of the provided set is an element of the this set and that the sets aren't equal", () => {
  const a = new XSet(["foo", true, 9]);
  const eqA = new XSet([true, "foo", 9]);
  const subA = new XSet([true, 9]);
  const notSubA = new XSet([9, "bar"]);

  expect(a.isProperSupersetOf(a)).toBe(false);
  expect(a.isProperSupersetOf(eqA)).toBe(false);
  expect(a.isProperSupersetOf(subA)).toBe(true);
  expect(a.isProperSupersetOf(notSubA)).toBe(false);
});

test("XSet.prototype.equals() determines whether the two sets have exactly the same elements", () => {
  const a = new XSet(["foo", true, 9]);
  const eqA = new XSet([true, "foo", 9]);
  const subA = new XSet([true, 9]);
  const notSubA = new XSet([9, "bar"]);
  const supA = new XSet(["foo", "bar", true, 9]);
  const notSupA = new XSet([true, 9, "bar"]);

  expect(a.equals(a)).toBe(true);
  expect(a.equals(eqA)).toBe(true);
  expect(a.equals(subA)).toBe(false);
  expect(a.equals(notSubA)).toBe(false);
  expect(a.equals(supA)).toBe(false);
  expect(a.equals(notSupA)).toBe(false);
});

test("XSet.prototype.equals() returns true if both sets are empty", () => {
  const a = new XSet();
  const eqA = new XSet();

  expect(a.equals(a)).toBe(true);
  expect(a.equals(eqA)).toBe(true);
});

test("XSet.prototype.isDisjointFrom() determines if there are zero elements that are in both sets", () => {
  const a = new XSet([8, "bar", null]);
  const eqA = new XSet([8, "bar", null]);
  const subA = new XSet([null, 8]);
  const supA = new XSet([8, "bar", null, "foo"]);
  const disA = new XSet([-77]);
  const notSubASupAOrDisA = new XSet([-77, null]);

  expect(a.isDisjointFrom(a)).toBe(false);
  expect(a.isDisjointFrom(eqA)).toBe(false);
  expect(a.isDisjointFrom(subA)).toBe(false);
  expect(a.isDisjointFrom(supA)).toBe(false);
  expect(a.isDisjointFrom(disA)).toBe(true);
  expect(a.isDisjointFrom(notSubASupAOrDisA)).toBe(false);
});

test("XSet.prototype.isDisjointFrom() returns true if one or more set is empty", () => {
  const a = new XSet();
  const eqA = new XSet();
  const b = new XSet(["foo"]);

  expect(a.isDisjointFrom(a)).toBe(true);
  expect(a.isDisjointFrom(eqA)).toBe(true);
  expect(a.isDisjointFrom(b)).toBe(true);
  expect(b.isDisjointFrom(a)).toBe(true);
});

test("XSet.prototype.cartesianProduct() returns the set of all [t, u] for each t in this and each u in the provided set", () => {
  const a = new XSet([0, 1, 2]);
  const b = new XSet(["a", "b", "c", "d"]);

  expect(a.cartesianProduct(b).toArray()).toEqual([
    [0, "a"],
    [0, "b"],
    [0, "c"],
    [0, "d"],

    [1, "a"],
    [1, "b"],
    [1, "c"],
    [1, "d"],

    [2, "a"],
    [2, "b"],
    [2, "c"],
    [2, "d"],
  ]);
});

test("XSet.prototype.cartesianProduct() is not necessarily commutative", () => {
  const a = new XSet([0, 1, 2]);
  const b = new XSet(["a", "b", "c", "d"]);

  const axb = a.cartesianProduct(b);
  const bxa = b.cartesianProduct(a);

  expect(axb.equals(bxa)).toBe(false);
});
