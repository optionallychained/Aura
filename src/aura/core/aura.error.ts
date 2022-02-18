/**
 * Utility class wrapping Error with custom information
 *
 * Facilitates user-friendly 'nice' error handling, with custom names and comprehensive messages
 */
export class AuraError extends Error {

    /**
     * Constructor. Construct a useful error message, and set the Error's name
     *
     * @param config the information to compile into the Error
     */
    constructor(config: { class: string; method: string; message: string; }) {
        super(`${config.method}() -> ${config.message}`);

        this.name = `${config.class} Error`;
    }
}
