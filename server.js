// CommonJs
/**
/* @type {import('fastify').FastifyInstance} Instance of Fastify
 */

const cors = require("@fastify/cors");

const fastify = require("fastify")({
  logger: true,
});

fastify.register(cors, {
  // put your options here
});

fastify.register(require("./db-connector"));
fastify.register(require("./routes"));




const startServer = async () => {
  try {
    await fastify.listen({ port: 8085 }, function (err, address) {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      console.log(`Server is now listening on ${address}`);
    });
  } catch (error) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer()