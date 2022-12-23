import Fastify from 'fastify';
import cors from '@fastify/cors'
import { userRoutes } from './routes/user';
import { breweriesRoutes } from './routes/brewery';

/**
 * Bootstrap function to initialize service
 */
async function bootstrap() {
  /*- Init fastify -*/
  const fastify = Fastify({ logger: true });

  //#region ENDPOINTS
  await fastify.register(userRoutes);
  await fastify.register(breweriesRoutes);
  //#endregion

  //#region FASTIFY CONFIGS
  /*- register CORS configuration -*/
  await fastify.register(cors, { origin: true });

  /*- Init fastify listener -*/
  await fastify.listen({ port: 3333 });
  //#endregion
}

bootstrap();