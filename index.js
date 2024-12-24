import blade from './modules/blade.js'
const Blade = new blade({devMode: 1})
const port = 3000
const db = await Blade.db('blade.json')

Blade.get('/', (req, res) => {
	return res.render('index.html')
})

Blade.get('/api', (req, res) => {
	return res.send({ok: 1})
})

Blade.static('static')
Blade.run(port)