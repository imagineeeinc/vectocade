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

import {Vectocade} from './emu/arcade'
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
var device = new Vectocade(document.getElementById('output-screen'), {})
device.testRender()
//updater
setInterval(() => {
  if (editor.state.doc.text.join('\n') == global_cart.script) return
  global_cart.script = editor.state.doc.text.join('\n')
  localStorage.setItem('current-cart', global_cart.export())
  device.loadROM(global_cart.script)
}, 1000)

// new cart
document.getElementById('create-btn').onclick = () => {
  global_cart = new cart(document.getElementById('new-cart-name').value)
  localStorage.setItem('current-cart', new cart(document.getElementById('new-cart-name').value).export())
  MicroModal.close('new')
}
//TODO: add a way to open a cart, a way to export a cart, reload a cart