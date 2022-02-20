var el = 0
cart.onDraw((d) => {
  d.text(2,10,el,0)
})
cart.onUpdate((c,e)=>{
  el = e
})