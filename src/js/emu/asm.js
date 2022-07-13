//TODO: NEED TO CLEEN UP THE CODE BASE
var dis = null
var clockSpeed = 4.166
import isolatedExec from './exec?worker'
var iso = new isolatedExec()
iso.onmessage = (e) => {
	if (e.data[0] == 'reset') {
		dis.reset()
		debug.reset()
	}
	if (e.data[0] == 'overClock') {
		clockSpeed = e.data[1]
	}
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
		clockSpeed = 41.66
		this.clock = new Clock(this.d)
	}
	reset() {
		clockSpeed = 41.66
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
	constructor(d) {
		this.clock = 0
		this.lastTime = Date.now()
		return setInterval(() => {
			this.clock++
			if (this.clock >= Math.floor(1000/clockSpeed)) {
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
function sanitize(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    var res = tmp.textContent || tmp.innerText || '';
    res.replace('\u200B', ''); // zero width space
    res = res.trim();
    return res;
}
var debug = {
	_start: [],
	onStart: (s)=>debug._start.push(s),
	log: (s)=>{
		document.getElementById('console').innerHTML += '<br>[➡] ' + sanitize(s)
	},
	err: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: crimson">[❌] ' + sanitize(s) + '</span>'
	},
	warn: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: yellow">[⚠️] ' + sanitize(s) + '</span>'
	},
	pass: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: springgreen">[✔️] ' + sanitize(s) + '</span>'
	},
	info: (s)=>{
		document.getElementById('console').innerHTML += '<br><span style="color: cornflowerblue">[ ℹ ] ' + sanitize(s) + '</span>'
	},
	reset: ()=>{
		document.getElementById('console').innerHTML = ''
		debug._start.forEach(e => {
			debug.info(e)
		})
	}
}