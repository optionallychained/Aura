/**
 * Decorator for overriding a class' name property at runtime
 *
 * Currently used only in naming Components to facilitate class-based retrieval and checking in minified builds
 */
export function Component(name: string) {
    // eslint-disable-next-line
    return function (target: Function): void {
        Object.defineProperty(target, 'name', { value: name });
        Object.defineProperty(target.prototype, 'name', { value: name });
    }
}
