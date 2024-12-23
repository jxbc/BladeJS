import blade from './modules/blade.js'
const Blade = new blade({devMode: 1})
const port = 3000

Blade.get('/', (req, res) => {
	return res.render('index.html')
})


Blade.static('static')
Blade.run(port)