//TODO: NEED TO CLEEN UP THE CODE BASE
var dis = null
export class cpu {
	constructor(display) {
		this.d = display
		dis = this.d
		this.reset()
		startCPU()
	}
	reset() {
		this.d.reset()
		skip = false
		//reset = true
		initFn()
	}
	run(code) {
		eval(code)
		this.reset()
		//this.d.preDefinedScene('test')
	}
}
var cart = {
	init: function(c) {
		initFn = c
	},
	initControler: ()=>{},
	wait:(s)=>{
		//skip = true
		//fix the wait code
		return new Promise((resolve) => setTimeout(resolve, s));
	},
	onUpdate: ()=>{}
}
var initFn = ()=>{}

const white = '#e0f8cf'
const black = '#071821'
const grey = '#86c06c'
const gray = '#8c8c8c'
const green = '#65ff00'
const highlight = '#65ff00'
var reset = false
var clock = 0
var skip = 0
function startCPU() {
	setInterval(() => {
		clock++
		if (clock == 30) {
			clock = 0
			if (skip != true) {
				//TODO: added a striped down display fn
				cart.onUpdate(dis)
			} else {
				console.log('skip')
			}
		}
	}, 0)
}