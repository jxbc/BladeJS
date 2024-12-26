let session = btoa(+Date.now())

function main() {
	let addTask = document.querySelector('.addTask')
	let inpt = document.querySelector('input')
	let block = document.querySelector('.blocks')

	fetch('/block', { method: "POST" }).then(async data => {
		let raw = await data.json()
		for(let f of raw.data) {
			block.insertAdjacentHTML('beforeend', `<div class="testBlock"><span class="color:${f.color}">${escape(f.text)}</span></div>`)
		}
	})

	inpt.addEventListener('keypress', e => {
		if(e.key == 'Enter') {
			addBlock(inpt)
		}
	})
	addTask.addEventListener('click', e => {
		addBlock(inpt)
	})

	longpoll()
}

async function longpoll() {
	let block = document.querySelector('.blocks')
	while(1) {
		let lp = await fetch('/lp', {method: 'POST', body: session})
		lp = await lp.json()
		
		if(lp.lp.length > 0) {
			for(let i of lp.lp) {
				console.log(i)
				document.querySelector('#count').innerText = i.count
				block.insertAdjacentHTML('beforeend', `<div class="testBlock"><span class="color:${escape(i.color)}">${escape(i.text)}</span></div>`)
				block.scrollTop = block.scrollHeight
			}
		}
		
	}
}

function addBlock(inpt) {
	let block = document.querySelector('.blocks')
	let select = document.querySelector('#color')
	if(!inpt.value || inpt.value == '') return false;
	fetch('/add', { method: "POST", body: JSON.stringify({text: escape(inpt.value), color: select.value, session: session})}).then(async data => {
		let raw = await data.json()
		document.querySelector('#count').innerText = raw.count
		block.insertAdjacentHTML('beforeend', `<div class="testBlock"><span class="color:${escape(raw.color)}">${escape(raw.text)}</span></div>`)
		block.scrollTop = block.scrollHeight
		inpt.value = ''
	})
}
function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#x60;');
}

main()