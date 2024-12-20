import Fastify from 'fastify'
import path from 'path'
import v8 from './modules/engine.js'
import Robot from './modules/hot.js'

const fastify = Fastify({
  logger: false
})

fastify.decorateReply('view', async function (template, args) {
    let filePath = path.resolve() + '/view/' + template
    try {
        let html = await v8.render(filePath, args);
        this.type('text/html').send(html);
    } catch (err) {
        this.status(500).send('Error rendering template: ' + err.message);
    }
})

fastify.get('/', async function (req, reply) {
  return reply.view('index.html', {name: 'John'})
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  console.error(err)
  process.exit(1)
}