import path from 'path';

import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';

let fastify = Fastify({ logger: true });

let time = Date.now();

fastify.register(FastifyStatic, {
  root: path.join(__dirname, 'public'),
});

fastify.get('/healthcheck', async function (_req, _res) {
  let elapsed = Date.now() - time;
  return `Server uptime: ${elapsed}`;
});

try {
  await fastify.listen({ port: 8080 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
