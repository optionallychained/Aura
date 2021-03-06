/**
 * Create a Mutable version of the class T by removing any readonly specifiers from its properties
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

/**
 * Create a 'newable' type for the class T
 */
export type ClassType<T> = { new(...args: Array<any>): T };

/**
 * Create a version of an object recursively requiring all properties
 */
export type DeepRequired<T> = { [K in keyof T]-?: DeepRequired<T[K]>; };

/**
 * Create a version of an object recursively making all properties optional
 */
export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]>; };
