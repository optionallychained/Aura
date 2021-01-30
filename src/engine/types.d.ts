/**
 * Create a Mutable version of the class T by removing any readonly specifiers from its properties
 */
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
