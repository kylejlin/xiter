import { XSet } from "./";

import { expectType } from "tsd";

import test from "./test";

test("XSet.prototype.filter() supports extension type narrowing if a type guard is provided", () => {
  interface Food {
    isFood: true;
  }

  interface Tasty {
    isTasty: true;
  }

  interface TastyFood extends Tasty, Food {}

  const burrito: TastyFood = { isFood: true, isTasty: true };
  const milkTea: Tasty = { isTasty: true };

  const tasty: XSet<Tasty> = new XSet([burrito, milkTea]);

  function isTastyFood(s: Tasty): s is TastyFood {
    return ((s as unknown) as any).isFood;
  }

  const tastyFood = tasty.filter(isTastyFood);

  expectType<XSet<TastyFood>>(tastyFood);
});

test("XSet.prototype.filter() supports intersection type narrowing if a type guard is provided", () => {
  interface Food {
    isFood: true;
  }

  interface Tasty {
    isTasty: true;
  }

  const burrito: Tasty & Food = { isFood: true, isTasty: true };
  const milkTea: Tasty = { isTasty: true };

  const tasty: XSet<Tasty> = new XSet([burrito, milkTea]);

  function isFood(s: unknown): s is Food {
    return (
      typeof s === "object" && s !== null && ((s as unknown) as any).isFood
    );
  }

  const tastyFood = tasty.filter(isFood);

  expectType<XSet<Tasty & Food>>(tastyFood);
});

test("XSet.prototype.find() supports extension type narrowing if a type guard is provided", () => {
  interface Food {
    isFood: true;
  }

  interface Tasty {
    isTasty: true;
  }

  interface TastyFood extends Tasty, Food {}

  const burrito: TastyFood = { isFood: true, isTasty: true };
  const milkTea: Tasty = { isTasty: true };

  const tasty: XSet<Tasty> = new XSet([burrito, milkTea]);

  function isTastyFood(s: Tasty): s is TastyFood {
    return ((s as unknown) as any).isFood;
  }

  const firstTastyFood = tasty.find(isTastyFood);

  expectType<TastyFood | undefined>(firstTastyFood);
});

test("XSet.prototype.find() supports intersection type narrowing if a type guard is provided", () => {
  interface Food {
    isFood: true;
  }

  interface Tasty {
    isTasty: true;
  }

  const burrito: Tasty & Food = { isFood: true, isTasty: true };
  const milkTea: Tasty = { isTasty: true };

  const tasty: XSet<Tasty> = new XSet([burrito, milkTea]);

  function isFood(s: unknown): s is Food {
    return (
      typeof s === "object" && s !== null && ((s as unknown) as any).isFood
    );
  }

  const firstTastyFood = tasty.find(isFood);

  expectType<(Tasty & Food) | undefined>(firstTastyFood);
});

test("XSet.prototype.flat() flattens the set of sets", () => {
  const setOfSets: XSet<
    Set<string> | XSet<number | string> | Set<boolean>
  > = new XSet([
    new Set(["foo", "bar"]),
    new XSet([42, "bar"]),
    new XSet<never>(),
    new Set<never>(),
    new Set([true]),
  ]);
  expectType<XSet<string | number | boolean>>(
    setOfSets.flat<string | number | boolean>(),
  );
});

test("XSet.prototype.union() returns a union type", () => {
  const x = new XSet(["a", "b", "c", 8]);
  const y = new XSet([1, false, 3]);

  expectType<XSet<string | number | boolean>>(x.union(y));
});

test("XSet.prototype.intersection() returns an intersection type", () => {
  const x = new XSet(["a", "b", "c", 8]);
  const y = new XSet([1, false, 3]);

  expectType<XSet<number>>(x.intersection(y));
});

test("XSet.prototype.xor() returns a union type", () => {
  const x = new XSet(["a", "b", "c", 8]);
  const y = new XSet([1, false, 3]);

  expectType<XSet<string | number | boolean>>(x.xor(y));
});

test("XSet.prototype.cartesianProduct() returns a set of tuples", () => {
  const x = new XSet(["a", "b", "c", 8]);
  const y = new XSet([1, false, 3]);

  expectType<XSet<[string | number, number | boolean]>>(x.cartesianProduct(y));
});
