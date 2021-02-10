import { Core, Screen } from '../engine';
import { mainState } from './state/main';
import { winState } from './state/win';

// instantiate a Game (canvas is automatically created)
const game = new Core.Game({
    width: 800,
    height: 600,
    debugMode: true,
    init: () => { console.log('GAME -> init') }
});

game.addShader(Screen.Shader.ShaderPrograms.PROGRAM_BASIC);

// add our States to the Game
game.addStates(mainState, winState);

// kick off the game's execution with the main state
game.start('main');
