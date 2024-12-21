import blade from './modules/blade.js'
const Blade = new blade()
const port = 3000

Blade.get('/', (req, res) => {
	return res.render('index.html', {name: 'John'})
})

Blade.run(port)

console.log(`Blade Started!`)