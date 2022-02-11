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