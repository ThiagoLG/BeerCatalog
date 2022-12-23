import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function breweriesRoutes(fastify: FastifyInstance) {

  /*- Get all breweries -*/
  fastify.get('/breweries', async (request) => {

    const breweries = await prisma.brewery.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return breweries;
  });



  /*- Get specific brewery -*/
  fastify.get('/breweries/:cId', async (request) => {

    const breweryParams = z.object({
      cId: z.string()
    })
    const { cId } = breweryParams.parse(request.params);

    const brewery = await prisma.brewery.findMany({
      orderBy: {
        name: 'asc'
      },
      where: {
        id: +cId
      }
    });

    return brewery;
  });



  /*- Include breweries on database -*/
  fastify.post('/breweries', async (request, reply) => {

    //Validate using zod
    const brewerySchema = z.object({
      active: z.boolean(),
      name: z.string(),
      countryOrigin: z.string().optional(),
      additionalInfos: z.string().optional(),
    });

    //Parse received data usind zod validations
    const createBreweryBody = brewerySchema.parse(request.body);

    //Insert brewery in db table
    try {

      const breweryCreated = await prisma.brewery.create({
        data: {
          active: createBreweryBody.active,
          name: createBreweryBody.name,
          additionalInfos: createBreweryBody.additionalInfos,
          countryOrigin: createBreweryBody.countryOrigin
        }
      });

      return reply.status(201).send({ id: breweryCreated.id });

    }
    catch (e) {

      console.log(e);
      return reply.status(400).send({
        message: 'Error trying to save brewery information, please check the data sent'
      });

    }

  });



  /*- Update breweries infos -*/
  fastify.patch('/breweries/:cId', async (request, reply) => {

    //Get brewery id from url and validate
    const breweryParams = z.object({ cId: z.string() });
    const { cId } = breweryParams.parse(request.params);
    console.log('cId =======================> ', cId);
    
    if (!cId)
      return reply.status(400).send({ message: 'Please, inform an Id on request body' });

    //search brewery with informed ID
    const brewery = await prisma.brewery.findUnique({
      where: {
        id: +cId
      }
    });
    if (!brewery)
      return reply.status(404).send({ message: 'Specified id not found' });

    //Validate using zod
    const breweryBodySchema = z.object({
      active: z.boolean().optional(),
      name: z.string().optional(),
      countryOrigin: z.string().optional(),
      additionalInfos: z.string().optional(),
    });

    //Parse received data usind zod validations
    const updateBreweryBody = breweryBodySchema.parse(request.body);

    //merge infos and send to database
    const breweriesToUpdate = {
      ...brewery,
      ...updateBreweryBody
    }

    //send infos to db
    try {
      const updatedBeerBreweryInfos = await prisma.brewery.update({
        data: {
          active: breweriesToUpdate.active,
          name: breweriesToUpdate.name,
          additionalInfos: breweriesToUpdate.additionalInfos,
          countryOrigin: breweriesToUpdate.countryOrigin
        },
        where: {
          id: +cId
        }
      });

      return reply.status(201).send({
        message: 'Brewery updated successfully',
        updatedBeerCraft: updatedBeerBreweryInfos
      })
    }
    catch (e) {
      console.log(e);
      return reply.status(400).send({
        message: 'Error trying to update Brewery information, please check the data sent'
      });

    }

  });

}