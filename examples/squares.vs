cart.onDraw((display)=> {
  display.rect(160/8,144/8,160/4*3,144/4*3,0)
  display.rect(160/4,144/4,160/2,144/2,3)
  display.rect(160/4+160/8,144/4+144/8,160/4,144/4,2)
  display.line(0,0,160,144,3)
  display.line(160,0,0,144,3)
})