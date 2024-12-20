import fs from 'fs'
import path from 'path'
import cp from 'child_process'
import { color } from './cmd.js'
import Fastify from 'fastify'
const fastify = Fastify({
  logger: false
})

let lastFiles = new Set();
let forks = null
let app = null
let count = 0

function main(name) {
	HotReload('./' + name)
}

function moreHotReload(arr, scopes = 0) {
	for(let obj of arr) {
		HotReload(obj)
	}
}

function HotReload(dir) {
	fs.watch(dir, (event, fileName) => {
		if(event === 'change' && fileName) {
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

async function useServer() {
	fastify.get('/', async function (req, reply) {
	  reply.header('Access-Control-Allow-Origin', '*')
	  setTimeout(() => {
	  	return {error: 'ok'}
	  }, 5000)

	  return { no: 'err' }
	})

	try {
	  await fastify.listen({ port: 9889 })
	} catch (err) {
	  console.log(err)
	  process.exit(1)
	}
}


export default { hot: main, watch: moreHotReload, start, useServer }