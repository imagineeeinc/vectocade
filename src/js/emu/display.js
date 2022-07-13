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
		this.p = this.width/80
		this.h = this.height/72
		window.onresize = () => {
			this.width = this.d.width
			this.height = this.d.height
			this.p = this.width/80
			this.h = this.height/72
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
			this.drawPixel(80/2, 0, 0)
			this.drawPixel(159, 72/2, 0)
			this.drawPixel(80/2, 143, 0)
			this.drawPixel(0, 72/2, 0)
			this.drawLine(0, 0, 80, 72, 2)
			this.drawLine(0, 72, 80, 0, 2)
			this.drawRect(80/2, 72/2, 2, 2, 4)
			this.drawText(80/4, 72/4, 'Hello World!', 3)
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
		ctx.fillRect(Math.round(x)*this.p,
		Math.round(y)*this.h,
		this.p,
		this.h)
	}
	drawRect(x,y,w,h,c) {
		let ctx = this.ctx
		ctx.fillStyle = resolveColour(c)
		ctx.fillRect(Math.round(x)*this.p,
		Math.round(y)*this.h,
		Math.round(w)*this.p,
		Math.round(h)*this.h)
	}
	drawLine(x1,y1,x2,y2,c) {
		let ctx = this.ctx
		ctx.strokeStyle = resolveColour(c)
		ctx.beginPath()
		ctx.moveTo(Math.round(x1)*this.p,
		Math.round(y1)*this.h)
		ctx.lineTo(Math.round(x2)*this.p,
		Math.round(y2)*this.h)
		ctx.stroke()
	}
	drawText(x,y,t,c) {
		let ctx = this.ctx
		ctx.font = "15px 'bit8', 'VT323', monospace"
		ctx.fillStyle = resolveColour(c)
		ctx.fillText(t,Math.round(x)*this.p,Math.round(y)*this.h)
	}
	drawBitmap(x,y,b) {
		for(let row = 0;row < b.length;row++) {
			let col = 0
			let trow = b[row]
			for(let col = 0;col < trow.length;col++) {
				this.drawPixel(x+col, y+row, trow[col])
				col++
			}
		}
	}
}
function resolveColour(n) {
	n=Math.round(n)
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