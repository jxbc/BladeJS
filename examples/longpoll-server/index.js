import blade from './modules/blade.js'
const Blade = new blade({devMode: 0})
const port = 3000
const db = await Blade.db('blade.json')

let lpEvents = []
let clients = []

Blade.get('/', (req, res) => {
	return res.render('index.html', {count: db.getCount()})
})

db.clear()

Blade.post('/add', (req, res) => {
	if(req.body) {
		req.body = JSON.parse(req.body)
		db.insert({
			text: req.body.text,
			session: req.body.session,
			color: req.body.color,
		})

		lpEvents.push({ count: db.getCount(), text: req.body.text, color: req.body.color, session: req.body.session })

		lpBroadcast(lpEvents, req)
		lpEvents = []
		return res.send({ count: db.getCount(), text: req.body.text, color: req.body.color, session: req.body.session })
	}
	return res.send({ count: db.getCount() })
})

Blade.post('/block', (req, res) => {
	res.send({ data: JSON.parse(db.raw()) })
})

Blade.post('/lp', async (req, res) => {
	const client = { resolve: null, res: res, ssid: req.body }

	const clientPromise = new Promise((resolve) => {
    	client.resolve = resolve;
  	})

  	clients.push(client)
  
  	const checkForEvents = () => lpEvents.length > 0;
  	new Promise((resolve) => {
    const interval = setInterval(() => {
      if(checkForEvents()) {
	        clearInterval(interval);
	        const events = [...lpEvents];
	        if(req.body == lpEvents[0].session) return 0
	        lpEvents = [];
	        resolve(res.send({ lp: events, type: 'new_event' }));
      	}
  		})
	})

	await Blade.longpoll((r) => {
		clients = clients.filter((c) => c !== client)
		res.send({ lp: [] })
	}, 12000)

})

function lpBroadcast(event, req) {
	while(clients.length > 0) {
		const client = clients.shift()
		if(client.ssid == req.body?.session) {
			client.resolve(client.res.send({lp: [], type: 'sendBroadcast' }))
		}
		else if(client.ssid == req.body) {
			client.resolve(client.res.send({lp: [], type: 'sendBroadcast' }))
		}
		client.resolve(client.res.send({ lp: event, type: 'broadcast' }))
	}
}

Blade.static('static')
Blade.run(port)