debug.pass("Cart loaded Sucsesfully!")
cart.unsafe.overClock(20)
var x = 0
var y = 0
cart.onDraw((display)=> {
  display.pixel(x,y,rand(0,3))
  x++
  if (x > 80) {
    x = 0
    y++
  }
  if (y > 72) {
    y=0
  }
})