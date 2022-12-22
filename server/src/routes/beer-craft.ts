import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function beerCraftsRoutes(fastify: FastifyInstance) {

  /*- Get all beer crafts -*/
  fastify.get('/crafts', async (request) => {

    const crafts = await prisma.beerCraft.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return crafts;
  });



  /*- Get specific beer craft -*/
  fastify.get('/crafts/:cId', async (request) => {

    const craftParams = z.object({
      cId: z.string()
    })
    const { cId } = craftParams.parse(request.params);

    const beerCraft = await prisma.beerCraft.findMany({
      orderBy: {
        name: 'asc'
      },
      where: {
        id: +cId
      }
    });

    return beerCraft;
  });



  /*- Include beer craft on database -*/
  fastify.post('/crafts', async (request, reply) => {

    //Validate using zod
    const beerCraftSchema = z.object({
      active: z.boolean(),
      name: z.string(),
      countryOrigin: z.string().optional(),
      additionalInfos: z.string().optional(),
    });

    //Parse received data usind zod validations
    const createBeerCraftBody = beerCraftSchema.parse(request.body);

    //Insert beer craft in db table
    try {

      const beerCraftCreated = await prisma.beerCraft.create({
        data: {
          active: createBeerCraftBody.active,
          name: createBeerCraftBody.name,
          additionalInfos: createBeerCraftBody.additionalInfos,
          countryOrigin: createBeerCraftBody.countryOrigin
        }
      });

      return reply.status(201).send({ id: beerCraftCreated.id });

    }
    catch (e) {

      console.log(e);
      return reply.status(400).send({
        message: 'Error trying to save beer craft information, please check the data sent'
      });

    }

  });



  /*- Update beer craft infos -*/
  fastify.patch('/crafts/:cId', async (request, reply) => {

    //Get craft id from url and validate
    const craftParams = z.object({ cId: z.string() });
    const { cId } = craftParams.parse(request.params);
    console.log('cId =======================> ', cId);
    
    if (!cId)
      return reply.status(400).send({ message: 'Please, inform an Id on request body' });

    //search beer craft with informed ID
    const craft = await prisma.beerCraft.findUnique({
      where: {
        id: +cId
      }
    });
    if (!craft)
      return reply.status(404).send({ message: 'Specified id not found' });

    //Validate using zod
    const beerCraftBodySchema = z.object({
      active: z.boolean().optional(),
      name: z.string().optional(),
      countryOrigin: z.string().optional(),
      additionalInfos: z.string().optional(),
    });

    //Parse received data usind zod validations
    const updateBeerCraftBody = beerCraftBodySchema.parse(request.body);

    //merge infos and send to database
    const beerCraftToUpdate = {
      ...craft,
      ...updateBeerCraftBody
    }

    //send infos to db
    try {
      const updatedBeerCraftInfos = await prisma.beerCraft.update({
        data: {
          active: beerCraftToUpdate.active,
          name: beerCraftToUpdate.name,
          additionalInfos: beerCraftToUpdate.additionalInfos,
          countryOrigin: beerCraftToUpdate.countryOrigin
        },
        where: {
          id: +cId
        }
      });

      return reply.status(201).send({
        message: 'Beer craft updated successfully',
        updatedBeerCraft: updatedBeerCraftInfos
      })
    }
    catch (e) {
      console.log(e);
      return reply.status(400).send({
        message: 'Error trying to update beere craft information, please check the data sent'
      });

    }

  });

}