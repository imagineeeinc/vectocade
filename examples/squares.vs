cart.onDraw((display)=> {
  display.rect(80/8,72/8,80/4*3,72/4*3,0)
  display.rect(80/4,72/4,80/2,72/2,3)
  display.rect(80/4+80/8,72/4+72/8,80/4,72/4,2)
  display.line(0,0,80,72,3)
  display.line(80,0,0,72,3)
})