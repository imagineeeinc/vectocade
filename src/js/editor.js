if (window.location.href.indexOf('#new') > -1) {
	MicroModal.show('new');
} else if (window.location.href.indexOf('#open') > -1) {
	MicroModal.show('open');
}
import '../css/editor.css';
import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {javascript} from "@codemirror/lang-javascript"

let myTheme = EditorView.theme({
  "&": {
		
    color: "#e0f8cf",
    backgroundColor: "#071821"
  },
  ".cm-content": {
    caretColor: "#e0f8cf"
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#e0f8cf"
  },
  "&.cm-focused": {
    backgroundColor: "#091f2b"
	},
	".cm-selectionBackground, ::selection": {
		backgroundColor: "#195474"
	},
	".cm-gutters": {
    backgroundColor: "#071821",
    color: "#e0f8cf",
    border: "none"
  }
}, {dark: true})

let editor = new EditorView({
  state: EditorState.create({
    extensions: [basicSetup, myTheme, javascript()]
  }),
  parent: document.getElementById("code-editor")
})

//cart class
class cart {
  constructor(name) {
    this.name = name;
    this.bitmaps = []
    this.script = ''
    //create a random hash
    this.hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  export() {
    return JSON.stringify(this)
  }
}
//gloabl cart
var global_cart = new cart('untitled')

//updater
setInterval(() => {
  global_cart.script = editor.state.doc.text.join('\n')
}, 1000)
//Test Drawing
var canvas = document.getElementById('output-screen')
var ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false
var width = canvas.width
var height = canvas.height
var p = width/160
var h = height/160
ctx.fillStyle = 'red'
ctx.fillRect(0*p, 0*h, p, h)
ctx.fillRect(159*p, 0*h, p, h)
ctx.fillRect(0*p, 143*h, p, h)
ctx.fillRect(159*p, 143*h, p, h)
ctx.fillStyle = 'blue'
ctx.fillRect(160/2*p, 0*h, p, h)
ctx.fillRect(159*p, 144/2*h, p, h)
ctx.fillRect(160/2*p, 143*h, p, h)
ctx.fillRect(0*p, 144/2*h, p, h)
ctx.fillStyle = 'green'
ctx.fillRect(160/2*p, 144/2*h, p*2, h*2)
//

// new cart
document.getElementById('create-btn').onclick = () => {
  global_cart = new cart(document.getElementById('new-cart-name').value)
  localStorage.setItem('current-cart', new cart(document.getElementById('new-cart-name').value).export())
  MicroModal.close('new');
}
//TODO: add a way to open a cart, a way to export a cart, reload a cart