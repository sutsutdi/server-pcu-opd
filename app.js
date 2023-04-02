
const Fastify = require('fastify')
import cors from '@fastify/cors'

const fastify = Fastify()
await fastify.register(cors, {
  origin: '*',
  methods: ['GET'],
  // put your options here
})



fastify.register(require('@fastify/mysql'), {
  connectionString: 'mysql://root@localhost/jhcis'
})

fastify.get('/customers', (req, reply)=> {
   fastify.mysql.query(
    'SELECT * FROM customers ',
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})



fastify.get('/customers/:id', (req, reply) => {
  fastify.mysql.query(
    'SELECT * FROM customers WHERE id=?', [req.params.id],
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})