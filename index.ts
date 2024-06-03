import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/', async function handler(_request, _response) {
  return { hello: 'world' };
});

try {
  await fastify.listen({ port: 8080 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
