/** @module "index" */
/**
 * An extension of `Set` that provides methods supporting common iterator operations such as `map` and `filter`,
 * as well as common set operations such as `union` and `isSubsetOf`.
 */
export default class XSet<T> implements Set<T> {
    /** Internally, `XSet` is implemented using composition, as opposed to inheritance. */
    private set;
    constructor(values?: Iterable<T> | null);
    /** @category Native */
    add(value: T): this;
    /**
     * Removes all elements from the set.
     *
     * @category Native
     */
    clear(): void;
    /**
     * If the provided value is in the set, deletes the value and returns true.
     * Otherwise, returns false.
     *
     * @category Native
     */
    delete(value: T): boolean;
    /**
     * Calls the provided callback  once for each element in the set, in insertion order.
     *
     * @category Native
     */
    forEach(callbackfn: (value: T, value2: T, set: XSet<T>) => void, thisArg?: any): void;
    /**
     * Determines if the set has the provided value.
     *
     * @category Native
     */
    has(value: T): boolean;
    /**
     * The number of elements in the set.
     *
     * @category Native
     */
    get size(): number;
    /**
     * Iterates over elements in the set, in insertion order.
     *
     * @category Native
     */
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * Returns an iterable of `[v,v]` pairs for every element `v` in the set, in insertion order.
     *
     * @category Native
     */
    entries(): IterableIterator<[T, T]>;
    /**
     * Despite its name, returns an iterable of the values (i.e., elements) in the set, in insertion order.
     *
     * @category Native
     */
    keys(): IterableIterator<T>;
    /**
     * Returns an iterable of elements in the set, in insertion order.
     *
     * @category Native
     */
    values(): IterableIterator<T>;
    /** @category Native */
    get [Symbol.toStringTag](): string;
    /** Returns an array of all the elements in this set, in insertion order. */
    toArray(): T[];
    /** Adds all the elements yielded by the provided iterable to this set. */
    addAll(values: Iterable<T>): this;
    /** Deletes all the elements yielded by the provided iterable from this set. */
    deleteAll(values: Iterable<T>): void;
    /**
     * Calls the provided callback function on each element of the set, and returns a set that contains the results.
     *
     * @category Iterator
     */
    map<U>(callbackfn: (value: T, value2: T, set: XSet<T>) => U, thisArg?: any): XSet<U>;
    /**
     * Returns the elements of the set that meet the condition specified in the provided callback function.
     *
     * @category Iterator
     */
    filter<U extends T>(callbackfn: (value: T, value2: T, set: XSet<T>) => value is U, thisArg?: any): XSet<U>;
    /**
     * Returns the elements of the set that meet the condition specified in the provided callback function.
     *
     * @category Iterator
     */
    filter<U>(callbackfn: (value: any, value2: T, set: XSet<T>) => value is U, thisArg?: any): XSet<T & U>;
    /**
     * Returns the elements of the set that meet the condition specified in the provided callback function.
     *
     * @category Iterator
     */
    filter(callbackfn: (value: T, value2: T, set: XSet<T>) => boolean, thisArg?: any): XSet<T>;
    /**
     * Calls the provided callback function for all the elements in the set.
     * The return value of the callback function is the accumulated result,
     * and is provided as an argument in the next call to the callback function.
     *
     * The elements are iterated over in insertion order.
     *
     * @category Iterator
     */
    reduce<U>(callbackfn: (acc: U, value: T, value2: T, set: XSet<T>) => U, initialValue: U): U;
    /**
     * Calls the provided callback function for all the elements in the set.
     * The return value of the callback function is the accumulated result,
     * and is provided as an argument in the next call to the callback function.
     *
     * The elements are iterated over in insertion order.
     *
     * @category Iterator
     */
    reduce(callbackfn: (acc: T, value: T, value2: T, set: XSet<T>) => T): T;
    /**
     * Determines whether the provided callback function returns true for every element of the set.
     *
     * Returns true if the set is empty.
     *
     * @category Iterator
     */
    every(callbackfn: (value: T, value2: T, set: XSet<T>) => boolean, thisArg?: any): boolean;
    /**
     * Determines whether the provided callback function returns true for any element of the set.
     *
     * Returns false if the set is empty.
     *
     * @category Iterator
     */
    some(callbackfn: (value: T, value2: T, set: XSet<T>) => boolean, thisArg?: any): boolean;
    /**
     * Returns the first element in this set (in insertion order) that satisfies the provided predicate.
     * Returns undefined if none of the elements satisfy the predicate.
     *
     * @category Iterator
     */
    find<U extends T>(predicate: (value: T, value2: T, set: XSet<T>) => value is U, thisArg?: any): U | undefined;
    /**
     * Returns the first element in this set (in insertion order) that satisfies the provided predicate.
     * Returns undefined if none of the elements satisfy the predicate.
     *
     * @category Iterator
     */
    find<U>(predicate: (value: any, value2: T, set: XSet<T>) => value is U, thisArg?: any): (T & U) | undefined;
    /**
     * Returns the first element in this set (in insertion order) that satisfies the provided predicate.
     * Returns undefined if none of the elements satisfy the predicate.
     *
     * @category Iterator
     */
    find(predicate: (value: T, value2: T, set: XSet<T>) => boolean, thisArg?: any): T | undefined;
    /**
     * Returns a union of this set's sets. Requires `this` to be a set of sets.
     *
     * @category Iterator
     */
    flat<U>(this: XSet<Set<U>>): XSet<U>;
    /** Returns a new set containing all this set's elements. */
    clone(): XSet<T>;
    /**
     * Returns a set containing all the elements that are either in `this` or `other`.
     *
     * @category Set Theory
     */
    union<U>(other: Set<U>): XSet<T | U>;
    /**
     * Returns a set containing all the elements that are both in `this` and `other`.
     *
     * @category Set Theory
     */
    intersection<U>(other: Set<U>): XSet<T & U>;
    /**
     * Returns a set of all the elements that are in `this` but not in `other`.
     *
     * @category Set Theory
     */
    difference(other: Set<any>): XSet<T>;
    /**
     * Returns a set of all the elements that are either only in `this` or only in `other`.
     * The returned set will not include elements that are in both sets.
     *
     * Other libaries call this operation symmetric difference or disjunctive union.
     *
     * @category Set Theory
     */
    xor<U>(other: Set<U>): XSet<T | U>;
    /**
     * Determines whether every element of this set is an element of the provided set.
     *
     * @category Set Theory
     */
    isSubsetOf(potentialSuperset: Set<any>): boolean;
    /**
     * Determines whether every element of this set is an element of the provided set
     * and the provided set contains at least one element not in this set.
     *
     * @category Set Theory
     */
    isProperSubsetOf(potentialSuperset: Set<any>): boolean;
    /**
     * Determines whether every element of the provided set is an element of this set.
     *
     * @category Set Theory
     */
    isSupersetOf(potentialSubset: Set<any>): boolean;
    /**
     * Determines whether every element of the provided set is an element of this set
     * and this set contains at least one element not in the provided set.
     *
     * @category Set Theory
     */
    isProperSupersetOf(potentialSubset: Set<any>): boolean;
    /**
     * Determines if this set has exactly the same elements as the provided set.
     *
     * @category Set Theory
     */
    equals(other: Set<any>): boolean;
    /**
     * Determines if there are zero elements that are both in this set and the provided set.
     *
     * @category Set Theory
     */
    isDisjointFrom(other: Set<any>): boolean;
    /**
     * Returns the set of all `[t, u]` for each `t` in `this` and each `u` in `other`.
     *
     * @category Set Theory
     */
    cartesianProduct<U>(other: Set<U>): XSet<[T, U]>;
}
