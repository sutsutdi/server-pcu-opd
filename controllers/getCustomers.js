const fastify = require('fastify')()


module.exports =  async(request, reply)=> {
  setImmediate(() => {
    reply.send({ hello: 'xxxx world' })
  })
  return reply
}