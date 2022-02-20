//TODO: NEED TO CLEEN UP THE CODE BASE
var dis = null
import isolatedExec from './exec?worker'
var iso = new isolatedExec()
iso.onmessage = (e) => {
	if (e.data[0] == 'display') {
		dis[e.data[1]](...e.data.slice(2))
	}
	if (e.data[0] == 'debug') {
		debug[e.data[1]](e.data[2])
	}
}
export class cpu {
	constructor(display) {
		this.d = display
		dis = this.d
		this.reset()
		iso.postMessage(['init'])
		this.clock = new Clock(this.d, 24)
	}
	reset() {
		iso.postMessage(['reset'])
		this.d.reset()
		debug.reset()
	}
	run(code) {
		this.reset()
		iso.postMessage(['run',code])
		//this.d.preDefinedScene('test')
	}
}

//Clock
class Clock {
	constructor(d, h) {
		this.clock = 0
		this.lastTime = Date.now()
		return setInterval(() => {
			this.clock++
			if (this.clock == h) {
				this.clock = 0
				this.elapsed = (Date.now()-this.lastTime)/1000
				iso.postMessage(['clockTick', {elapsed: this.elapsed}])
				this.lastTime = Date.now()
			}
		}, 0)
	}
}
//APIs

/*const sanitizer = new Sanitizer()
sanitizer.sanitizeFor("div", s)*/
var debug = {
	_start: [],
	onStart: (s)=>debug._start.push(s),
	log: (s)=>{
		document.getElementById('console').innerHTML += '<br>[➡] ' + s
	},
	err: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: crimson">[❌] ' + s + '</span>'
	},
	warn: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: yellow">[⚠️] ' + s + '</span>'
	},
	pass: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: springgreen">[✔️] ' + s + '</span>'
	},
	info: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: cornflowerblue">[ ℹ ] ' + s + '</span>'
	},
	reset: ()=>{
		document.getElementById('console').innerHTML = ''
		debug._start.forEach(e => {
			debug.info(e)
		})
	}
}