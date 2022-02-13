const { resolve } = require('path')
module.exports = {
	base: process.env.DEPO == 'vercel' ? '/' : '/vectocade/',
	title: 'Vectocade',
	description: 'A Fantasy Computer for making tiny retro games, made with js',
	root: './src',
	dest: './dist',
	build: {
		outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        editor: resolve(__dirname, 'src/editor/index.html'),
	play: resolve(__dirname, 'src/play/index.html')
      }
    }
  }
}
