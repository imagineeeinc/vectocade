cart.init = () => {
	var display = cart.initDisplay()
	var controls = cart.initControler()
	var sound = cart.initSound()
	var res = cart.initResources()
	var debug = cart.debugerConect()
	
	var exec = cart.unsafe.onTheFlyExec
	cart.unsafe.initExecKeygen()
	debug.onIn(handleDebugIn, cart.unsafe.execKey)

	cart.onUpdate = () => {
		display.drawPixel(1,1,black)
	}
	debug.out(controls.requestTextInput())
	
	function handleDebugIn(text, key) {
		exec(text, key)
	}
}