// CommonJs
/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin')

/**
 * Connects to a MongoDB database
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
//  async function dbConnector (fastify, options) {
//    fastify.register(require('@fastify/mysql'), {
//     connectionString: 'mysql://root@localhost/hi'
//    })
//  }

const fp = require('fastify-plugin')
const mysql = require('@fastify/mysql')

//  module.exports = fp(async (fastify, opts) => {
//   const mysqlOpts = Object.assign({}, {
//     host: '192.168.8.2' || '',
//     port: '3306' || '',
//     database: 'hi' || '',
//     user: 'sudthee' || '',
//     password: '123456789' || ''
//   }, opts.mysql)

module.exports = fp(async (fastify, opts) => {
  // const mysqlOpts = Object.assign(
  //   {},
  //   {
  //     host: '192.168.8.100' || '',
  //     port: '3306' || '',
  //     database: 'hi' || '',
  //     user: 'hiuser' || '',
  //     password: '212224' || '',
  //   },
  //   opts.mysql
  // )

   const mysqlOpts = Object.assign({}, {
    host: 'localhost' || '',
    port: '3306' || '',
    database: 'jhcisdb' || '',
    user: 'root' || '',
    password: '' || ''
  }, opts.mysql)

  fastify.register(mysql, mysqlOpts)
})
// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
//  module.exports = fastifyPlugin(dbConnector)
