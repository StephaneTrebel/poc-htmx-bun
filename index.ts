import path from 'path';

import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import prettyMilliseconds from 'pretty-ms';
import render from 'preact-render-to-string/jsx';

import Step from './step';

let fastify = Fastify({ logger: true });

let time = Date.now();

fastify.register(FastifyStatic, {
  root: path.join(__dirname, 'public'),
});

fastify.get('/healthcheck', async function (_req, _res) {
  let elapsed = Date.now() - time;
  return `Server uptime: ${prettyMilliseconds(elapsed, {
    compact: true,
    verbose: true,
  })}`;
});

fastify.get('/breadcrumb/get-first', async function (_req, _res) {
  return render(Step({ step: 'first', step_content: 'lol' }));
});

fastify.get('/breadcrumb/get-second', async function (_req, _res) {
  return render(Step({ step: 'second', step_content: 'foo' }));
});

fastify.get('/breadcrumb/get-last', async function (_req, _res) {
  return render(Step({ step: 'last', step_content: 'bar' }));
});

try {
  await fastify.listen({ port: 3001 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
