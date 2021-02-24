/**
 * Internal-use interface describing a ProtoGLError configuration
 */
interface ProtoGLErrorConfig {
    /** Name of the class that threw the error; to be used in the Error's name */
    class: string;
    /** Method that threw the error; to be used in the Error's message */
    method: string;
    /** The main Error message; to be combined with the method */
    message: string;
}

/**
 * Utility class wrapping Error with custom information
 *
 * Facilitates user-friendly 'nice' error handling, with custom names and comprehensive messages
 */
export class ProtoGLError extends Error {

    /**
     * Constructor. Construct a useful error message, and set the Error's name
     *
     * @param config the information to compile into the Error
     */
    constructor(config: ProtoGLErrorConfig) {
        super(`${config.method}() -> ${config.message}`);

        this.name = `${config.class} Error`;
    }
}
