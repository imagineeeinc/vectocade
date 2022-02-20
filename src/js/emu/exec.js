onmessage = function(e) {
  handleContext(e.data)
  //postMessage(workerResult)
}
//API
var cart = {
	reset: ()=>{
		cart.drawFn = ()=>{}
		cart.updateFn = ()=>{}
	},
	wait:(s)=>{
		skip = true
		//FIXME: the wait code
		return new Promise((resolve) => setTimeout(()=>{skip = false;resolve()}, s));
	},
	net: {
		httpRequest: (url, method, data) => {
			return new Promise((resolve, reject
			) => {
				fetch(url, {
					method: method,
					body: data
				}).then(res => {
					res.text().then(resolve)
				}
				)
			})
		}
	},
	debug: debug,
	onDraw: (s)=>cart.drawFn = s,
	drawFn: ()=>{},
	onUpdate: (s)=>cart.updateFn = s,
	updateFn: ()=>{},
}	
var emuDisplay = {
	drawPixel: (...a)=>postMessage(['display','drawPixel',...a]),
	pixel: (...a)=>postMessage(['display','drawPixel',...a]),
	rect: (...a)=>postMessage(['display','drawRect',...a]),
	text: (...a)=>postMessage(['display','drawText',...a]),
	line: (...a)=>postMessage(['display','drawLine',...a]),
	print: (...a)=>postMessage(['display','drawText',...a]),
	reset: ()=>postMessage(['display','reset']),
	clear: ()=>postMessage(['display','reset']),
	drawScene: (...a)=>postMessage(['display','preDefinedScene',...a]),
	drawSprite: (...a)=>postMessage(['display','drawBitmap',...a]),
	drawBitmap: (...a)=>postMessage(['display','drawBitmap',...a]),
	drawBackground: (...a)=>postMessage(['display','drawBitmap',...a]),
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

var debug = {
	log: (s)=>postMessage(['debug','log',s]),
	err: (s)=>postMessage(['debug','err',s]),
	warn: (s)=>postMessage(['debug','warn',s]),
	pass: (s)=>postMessage(['debug','pass',s]),
	info: (s)=>postMessage(['debug','info',s]),
	reset: ()=>postMessage(['debug','reset'])
}
var skip = false

//Controller Code
function handleContext(ctx) {
	if (ctx[0] == 'run') run(ctx[1])
	if (ctx[0] == 'init') init()
	if (ctx[0] == 'reset') reset()
	if (ctx[0] == 'clockTick') {
		if (skip) return
		cart.updateFn({}, ctx[1].elapsed)
		emuDisplay.reset()
		cart.drawFn(emuDisplay, ctx[1].elapsed)
	}
}
function run(code) {
	//Sanitize code
	code = code.replace(/alert\(.*\)/g, '')
	code = code.replace(/console\.log\(.*\)/g, '')
	code = code.replace(/document\.querySelector\(.*\)/g, '')
	code = code.replace(/document\.querySelectorAll\(.*\)/g, '')
	code = code.replace(/document\.getElementById\(.*\)/g, '')
	code = code.replace(/document\.getElementsByClassName\(.*\)/g, '')
	code = code.replace(/document\.getElementsByTagName\(.*\)/g, '')
	code = code.replace(/document\.getElementsByName\(.*\)/g, '')
	code = code.replace(/importScripts\(.*\)/g, '')
	code = code.replace(/postMessage\(.*\)/g, '')
	try {eval(code)}catch(e){debug.err(e);cart.reset()}

}
function init() {
	//var global_clock = new Clock(emuDisplay)
}
function reset() {
	skip = false
	cart.reset()
}
skip = false