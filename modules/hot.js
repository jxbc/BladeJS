import fs from 'fs'
import path from 'path'
import cp from 'child_process'
import { color } from './cmd.js'

let lastFiles = new Set();
let forks = null
let app = null
let count = 0

function main(name) {
	HotReload('./' + name)
}

function moreHotReload(arr, exclude = 0) {
	if(exclude || exclude.length > 0) {
		for(let obj of arr) {
			for(let exc of exclude) {
				HotReload(obj, exc)
			}
		}
	}
	else
	{
		for(let obj of arr) {
			HotReload(obj)
		}	
	}
}

function HotReload(dir, ext = 0) {
	fs.watch(dir, (event, fileName) => {
		if(event === 'change' && fileName) {
			if(fileName == ext) return 0;
			if (!lastFiles.has(fileName)) {
                lastFiles.add(fileName);
                setTimeout(() => lastFiles.delete(fileName), 100);
                reload()
            }
		}
	});
}

function reload() {
	count++
	if(forks) forks.kill()
	forks = cp.fork(app)
	console.log(`${color.tGreen}[watch]<${count}> Server Reloaded`, color.Reset)
}

function start(file) {
	app = file
	forks = cp.fork(file)
}


export default { hot: main, watch: moreHotReload, start }