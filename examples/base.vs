cart.init(() => {
	var display = cart.initDispaly()
	var controls = cart.initControler()
	var sound = cart.initSound()
	var res = cart.initResources()
	var debug = cart.debugerConect()
	var color = cart.resolveColor
	
	var exec = cart.unsafe.onTheFlyExec
	cart.unsafe.initExecKeygen()
	debug.onIn(handleDebugIn, cart.unsafe.execKey)

	cart.onUpdate(() => {
		display.setPixel(1,1,color("rgb(0,0,255)"))
	})
	debug.out(controls.requestTextInput())
	
	function handleDebugIn(text, key) {
		exec(text, key)
	}
})