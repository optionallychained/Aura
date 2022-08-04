/**
 * Super basic audio manager, MVP implementation
 */
export class AudioManager {

    /** Mapping of name -> filepath for storing and accessing sounds */
    private sounds: Map<string, string> = new Map();

    /**
     * Add a new sound to the game for playing later
     *
     * @param name the name of the sound to add
     * @param filePath the path to the audio file (including extension)
     */
    public add(name: string, filePath: string): void {
        this.sounds.set(name, filePath);
    }

    /**
     * Play the sound with the given name
     *
     * @param name the name of the sound to play
     */
    public play(name: string): void {
        const path = this.sounds.get(name);

        if (path) {
            // construct new audio every play to allow simultaneous playback
            void new Audio(path).play();
        }
    }
}
