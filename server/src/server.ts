import Fastify from 'fastify';
import cors from '@fastify/cors'

/**
 * Bootstrap function to initialize service
 */
async function bootstrap() {
  /*- Init fastify -*/
  const fastify = Fastify({ logger: true });

  //#region ENDPOINTS
  fastify.get('/beers', (request) => {
    return {
      teste: 'teste'
    }
  })
  //#endregion

  //#region FASTIFY CONFIGS
  /*- register CORS configuration -*/
  await fastify.register(cors, { origin: true });

  /*- Init fastify listener -*/
  await fastify.listen({ port: 3333 });
  //#endregion
}

bootstrap();