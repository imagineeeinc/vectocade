export class display {
	constructor(canvas) {
		this.d = canvas
		this.ctx = this.d.getContext('2d')
		this.ctx.imageSmoothingEnabled = false
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
			this.drawPixel(0, 0, 'red')
			this.drawPixel(159, 0)
			this.drawPixel(0, 143)
			this.drawPixel(159, 143)
			this.drawPixel(160/2, 0, 'blue')
			this.drawPixel(159, 144/2)
			this.drawPixel(160/2, 143)
			this.drawPixel(0, 144/2)
			this.drawLine(0, 0, 160, 144, 'orange')
			this.drawLine(0, 144, 160, 0)
			this.drawRect(160/2, 144/2, 2, 2, 'green')
			this.drawText(160/4, 144/4, 'Hello World!', white, 20)
		}
	}
	reset() {
		let ctx = this.ctx
		ctx.fillStyle = black
		ctx.fillRect(0,0,this.width,this.height)
	}
	drawPixel(x,y,c) {
		let ctx = this.ctx || this.ctx.fillStyle
		ctx.fillStyle = c
		ctx.fillRect(x*this.p,y*this.h,this.p,this.h)
	}
	drawRect(x,y,w,h,c) {
		let ctx = this.ctx
		ctx.fillStyle = c || this.ctx.fillStyle
		ctx.fillRect(x*this.p,y*this.h,w*this.p,h*this.h)
	}
	drawLine(x1,y1,x2,y2,c) {
		let ctx = this.ctx
		ctx.strokeStyle = c || this.ctx.strokeStyle
		ctx.beginPath()
		ctx.moveTo(x1*this.p,y1*this.h)
		ctx.lineTo(x2*this.p,y2*this.h)
		ctx.stroke()
	}
	drawText(x,y,t,c, s) {
		let ctx = this.ctx
		ctx.font = s+"px 'bit8', 'VT323', monospace"
		ctx.fillStyle = c || this.ctx.fillStyle
		ctx.fillText(t,x*this.p,y*this.h)
	}
}
export const white = '#e0f8cf'
export const black = '#071821'
export const grey = '#86c06c'
export const gray = '#8c8c8c'
export const green = '#65ff00'
export const highlight = '#65ff00'