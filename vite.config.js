const { resolve } = require('path')
module.exports = {
	base: '/vectocade/',
	title: 'Vectocade',
	description: 'A Fantasy Computer for making tiny retro games, made with js',
	//set the views directory
	root: './src',
	dest: './dist',
	build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        editor: resolve(__dirname, 'editor/index.html')
      }
    }
  }
}