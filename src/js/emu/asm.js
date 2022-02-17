//TODO: NEED TO CLEEN UP THE CODE BASE
var dis = null
export class cpu {
	constructor(display) {
		this.d = display
		dis = this.d
		this.reset()
		this.clock = new Clock(this.d)
	}
	reset() {
		cart.reset()
		this.d.reset()
		debug.reset()
		skip = false
	}
	run(code) {
		//Sanitize code
		code = code.replace(/alert\(.*\)/g, '')
		code = code.replace(/console\.log\(.*\)/g, '')
		code = code.replace(/document\.querySelector\(.*\)/g, '')
		code = code.replace(/document\.querySelectorAll\(.*\)/g, '')
		code = code.replace(/document\.getElementById\(.*\)/g, '')
		code = code.replace(/document\.getElementsByClassName\(.*\)/g, '')
		code = code.replace(/document\.getElementsByTagName\(.*\)/g, '')
		code = code.replace(/document\.getElementsByName\(.*\)/g, '')

		this.reset()
		try {eval(code)}catch(e){debug.err(e);cart.reset()}
		//this.d.preDefinedScene('test')
	}
}
//Clock and helper Systems
class Clock {
	constructor(d) {
		this.clock = 0
		this.lastTime = Date.now()
		return setInterval(() => {
			this.clock++
			if (this.clock == 30) {
				this.clock = 0
				if (skip != true) {
					//TODO: added a striped down display fn
					d.reset()
					this.elapsed = (Date.now()-this.lastTime)/1000
					cart.onUpdate({}, this.elapsed)
					cart.onDraw({
						drawPixel: (...a)=>d.drawPixel(...a),
						pixel: (...a)=>d.drawPixel(...a),
						rect: (...a)=>d.drawRect(...a),
						text: (...a)=>d.drawText(...a),
						line: (...a)=>d.drawLine(...a),
						print: (...a)=>d.drawText(...a),
						rest: (...a)=>d.reset(...a),
						clear: (...a)=>d.reset(...a),
						drawScene: (...a)=>d.preDefinedScene(...a),
						drawSprite: (...a)=>d.drawBitmap(...a),
						drawBitmap: (...a)=>d.drawBitmap(...a),
						drawBackground: (...a)=>d.drawBackground(...a),
					}, this.elapsed)
					this.lastTime = Date.now()
				} else if(skip == true) {
				}
			}
		}, 0)
	}
}
var skip = false
//APIs
var cart = {
	reset: ()=>{
		cart.onDraw = ()=>{}
		cart.onUpdate = ()=>{}
	},
	wait:(s)=>{
		skip = true
		//FIXME: the wait code
		return new Promise((resolve) => setTimeout(()=>{skip = false;resolve()}, s));
	},
	debug: debug,
	onDraw: ()=>{},
	onUpdate: ()=>{}
}
function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randFloat(min, max) {
	return Math.random() * (max - min + 1) + min;
}
function print(s) {
	debug.log(s)
}
/*const sanitizer = new Sanitizer()
sanitizer.sanitizeFor("div", s)*/
var debug = {
	log: (s)=>{
		document.getElementById('console').innerHTML += '<br>' + s
	},
	err: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: crimson">' + s + '</span>'
	},
	warn: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: yellow">' + s + '</span>'
	},
	pass: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: springgreen">' + s + '</span>'
	},
	info: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: cornflowerblue">' + s + '</span>'
	},
	reset: ()=>{
		document.getElementById('console').innerHTML = ''
	}
}