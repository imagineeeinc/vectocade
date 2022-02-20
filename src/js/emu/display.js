export class display {
	constructor(canvas) {
		//TODO: Use a background canvas and then render that to the mani canvas with pixels
		this.d = canvas
		this.ctx = this.d.getContext('2d')
		this.ctx.imageSmoothingEnabled = false;
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.webkitImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.width = this.d.width
		this.height = this.d.height
		this.p = this.width/160
		this.h = this.height/144
		window.onresize = () => {
			this.width = this.d.width
			this.height = this.d.height
			this.p = this.width/160
			this.h = this.height/144
		}
	}
	preDefinedScene(scene) {
		let ctx = this.ctx
		if (scene == 'test') {
			var p = this.p
			var h = this.h
			this.drawPixel(0, 0, 0)
			this.drawPixel(159, 0, 0)
			this.drawPixel(0, 143, 0)
			this.drawPixel(159, 143, 0)
			this.drawPixel(160/2, 0, 0)
			this.drawPixel(159, 144/2, 0)
			this.drawPixel(160/2, 143, 0)
			this.drawPixel(0, 144/2, 0)
			this.drawLine(0, 0, 160, 144, 2)
			this.drawLine(0, 144, 160, 0, 2)
			this.drawRect(160/2, 144/2, 2, 2, 4)
			this.drawText(160/4, 144/4, 'Hello World!', 3)
		}
	}
	reset() {
		let ctx = this.ctx
		ctx.fillStyle = black
		ctx.fillRect(0,0,this.width,this.height)
	}
	drawPixel(x,y,c) {
		let ctx = this.ctx
		ctx.fillStyle = resolveColour(c)
		ctx.fillRect(x*this.p,y*this.h,this.p,this.h)
	}
	drawRect(x,y,w,h,c) {
		let ctx = this.ctx
		ctx.fillStyle = resolveColour(c)
		ctx.fillRect(x*this.p,y*this.h,w*this.p,h*this.h)
	}
	drawLine(x1,y1,x2,y2,c) {
		let ctx = this.ctx
		ctx.strokeStyle = resolveColour(c)
		ctx.beginPath()
		ctx.moveTo(x1*this.p,y1*this.h)
		ctx.lineTo(x2*this.p,y2*this.h)
		ctx.stroke()
	}
	drawText(x,y,t,c) {
		let ctx = this.ctx
		ctx.font = "15px 'bit8', 'VT323', monospace"
		ctx.fillStyle = resolveColour(c)
		ctx.fillText(t,x*this.p,y*this.h)
	}
	drawBitmap(x,y,b) {}
	drawBitmap(x,y,b) {}
}
function resolveColour(n) {
	if (n == 0) return white
	if (n == 1) return black
	if (n == 2) return grey
	if (n == 3) return highlight
	if (n == 4) return green
	return white
}
export const white = '#e0f8cf'
export const black = '#071821'
export const grey = '#86c06c'
export const gray = '#8c8c8c'
export const green = '#65ff00'
export const highlight = '#65ff00'