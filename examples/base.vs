cart.init(() => {
	var controls = cart.initControler()

	cart.onUpdate = (display) => {
		display.drawPixel(1,1,white)
	}
})