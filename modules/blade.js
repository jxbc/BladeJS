import Fastify from 'fastify'
import path from 'path'
import v8 from './engine.js'
import Robot from './hot.js'

const fastify = Fastify({
  logger: false
})

export default class Blade {
  get(path, handler) {
    fastify.get(path, async function (request, reply) {
      await handler(request, reply)
    })
  }

  post(path, handler) {
    fastify.post(path, async function (request, reply) {
      await handler(request, reply)
    })
  }

  cors(res) {
    res.header('Access-Control-Allow-Origin', '*')
  }

  async run(port) {
    try {
      await fastify.listen({ port: port })
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
}

fastify.decorateReply('render', async function (template, args) {
    let filePath = path.resolve() + '/view/' + template
    try {
        this.type('text/html').send(await v8.render(filePath, args));
    } catch (err) {
        this.status(500).send('Error rendering template: ' + err.message);
    }
})

fastify.decorateReply('cors', async function () {
    this.header('Access-Control-Allow-Origin', '*')
})