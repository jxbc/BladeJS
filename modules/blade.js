import Fastify from 'fastify'
import fastifyStatic from './static/index.js'
import path from 'node:path'
import v8 from './engine.js'
import Robot from './hot.js'

const fastify = Fastify({
  logger: false
})

let devMode = 0

export default class Blade {
  constructor(object) {
    if(!object || object === undefined) {
      object = {
        devMode: devMode
      }
    }
    else
    {
      devMode = object.devMode
    }
  }

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

  static(dir) {
    let _dir = path.resolve()
    let join = path.join(_dir, dir)

    fastify.register(fastifyStatic, {
      root: join,
      prefix: `/${dir}/`,
    })
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
        this.type('text/html').send(await v8.render(filePath, args, devMode));
    } catch (err) {
        this.status(500).send('Error rendering template: ' + err.message);
    }
})

fastify.decorateReply('cors', async function () {
    this.header('Access-Control-Allow-Origin', '*')
})