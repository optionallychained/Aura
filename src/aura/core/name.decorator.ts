/**
 * Decorator for overriding a class' name property at runtime
 *
 * Currently used only in naming Components to facilitate class-based retrieval and checking in minified builds
 */
export function Name(name: string) {
    // eslint-disable-next-line
    return function (target: any): void {
        Object.defineProperty(target, 'name', { value: name });
    }
}



// TODO rename to @Component?
//   remove Component superclass as it only exists to provide the name property...
//   though decorators can't change type shape, so would this work?
//     - convenient that we're using 'name'? - an already-extant JS property?
//   basically turns component definition into an object-level monkey-patch...
