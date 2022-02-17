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
//cart class
class cart {
  constructor(name, l) {
    this.name = name;
    this.bitmaps = []
    this.script = ''
    if (l) {
      this.load(l)
    }
    //create a random hash
    this.hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  export() {
    return JSON.stringify(this)
  }
  load(l) {
    this.name = l.name
    this.bitmaps = l.bitmaps
    this.script = l.script
  }
}
var global_cart
var editor
window.onload = () => {
  if (localStorage.getItem('current-cart')) {
    let c = JSON.parse(localStorage.getItem('current-cart'))
    global_cart = new cart(c.name, c)
    editor = new EditorView({
      state: EditorState.create({
        extensions: [basicSetup, myTheme, javascript()]
      }),
      parent: document.getElementById("code-editor")
    })
    editor.dispatch({
      changes: {from: 0, insert: global_cart.script.split('\n').join('\n')}
    })
    device.loadROM(global_cart)
  } else {
    var global_cart = new cart('Untitled')
    editor = new EditorView({
      state: EditorState.create({
        extensions: [basicSetup, myTheme, javascript()]
      }),
      parent: document.getElementById("code-editor")
    })
  }
  //updater
  setInterval(() => {
    if (editor.state.doc.text.join('\n') == global_cart.script) return

    global_cart.script = editor.state.doc.text.join('\n')
    localStorage.setItem('current-cart', global_cart.export())
    device.loadROM(global_cart)
  }, 1000)
}


import {Vectocade} from './emu/arcade'
//device setup
var device = new Vectocade(document.getElementById('output-screen'), {})
device.testRender()
device.reset()



// new cart
document.getElementById('create-btn').onclick = () => {
  global_cart = new cart(document.getElementById('new-cart-name').value)
  localStorage.setItem('current-cart', global_cart.export())
  MicroModal.close('new')
  history.replaceState({}, "", "#")
}
window.onbeforeunload = () => {
  localStorage.setItem('current-cart', global_cart.export())
}
//TODO: add a way to open a cart, a way to export a cart, reload a cart