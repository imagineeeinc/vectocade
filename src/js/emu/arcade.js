import {cpu} from './asm';
import './controls';
import {display, black, white, grey, gray, green, highlight} from './display';
import './resources';
import './sound';

export class Vectocade {
	constructor(canvas, o) {
		this.display = new display(canvas);
		this.cpu = new cpu(this.display);
		this.o = o
	}
	testRender() {
		this.display.preDefinedScene('test')
	}
	reset() {
		this.cpu.reset()
	}
	loadROM(rom) {
		this.cpu.run(rom.script)
	}
}