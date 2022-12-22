import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import ShortUniqueId from "short-unique-id";

/**
 * Function used to provide user routes to keep CRUD actions
 * @param fastify instance of fastify used to manage routes
 */
export async function userRoutes(fastify: FastifyInstance) {


  /*- Get All users -*/
  fastify.get('/users', async (request) => {

    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return users;
  });


  /*- Get specific user -*/
  fastify.get('/users/:uId', async (request) => {

    const userParams = z.object({
      uId: z.string()
    })
    const { uId } = userParams.parse(request.params);

    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      },
      where: {
        id: uId
      }
    });

    return users;
  });


  /*- Include user on database -*/
  fastify.post('/users', async (request, reply) => {

    //Validate using zod
    const userBodySchema = z.object({
      active: z.boolean(),
      name: z.string(),
      email: z.string().email('Insert valid email'),
      authCode: z.string(),
      googleId: z.string().optional()
    });

    //Parse received data usind zod validations
    const createUserBody = userBodySchema.parse(request.body);

    //Generate new id to user
    const generate = new ShortUniqueId({ length: 8 });
    const uId = String(generate()).toLowerCase();

    //Insert user in db table
    try {

      await prisma.user.create({
        data: {
          id: uId,
          active: createUserBody.active,
          name: createUserBody.name,
          email: createUserBody.email,
          authCode: createUserBody.authCode,
          googleId: createUserBody.googleId
        }
      });

      return reply.status(201).send({ uId });

    }
    catch (e) {

      console.log(e);
      return reply.status(400).send({
        message: 'Error trying to save user information, please check the data sent'
      });

    }

  });


  /*- Update user infos -*/
  fastify.patch('/users', async (request, reply) => {

    //Get UserId from Body and validate
    const reqBody: any = request.body;
    const uId = reqBody.id;
    if (!uId)
      return reply.status(400).send({ message: 'Please, inform an Id on request body' });

    //search user with informed ID
    const user = await prisma.user.findUnique({
      where: {
        id: uId
      }
    });
    if (!user)
      return reply.status(404).send({ message: 'Specified id not found' });

    //Validate using zod
    const userBodySchema = z.object({
      active: z.boolean().optional(),
      name: z.string().optional(),
      email: z.string().email('Insert valid email').optional(),
      authCode: z.string().optional(),
      googleId: z.string().optional()
    });

    //Parse received data usind zod validations
    const updateUserBody = userBodySchema.parse(request.body);

    //merge infos and send to database
    const userToUpdate = {
      ...user,
      ...updateUserBody
    }

    //send infos to db
    try {
      const updatedUserInfos = await prisma.user.update({
        data: {
          active: userToUpdate.active,
          authCode: userToUpdate.authCode,
          email: userToUpdate.email,
          googleId: userToUpdate.googleId,
          name: userToUpdate.name
        },
        where: {
          id: uId
        }
      });

      userToUpdate.authCode = '' //remove authCode from return

      return reply.status(201).send({
        message: 'User updated successfully',
        userToUpdate
      })
    }
    catch (e) {
      console.log(e);
      return reply.status(400).send({
        message: 'Error trying to update user information, please check the data sent'
      });

    }

  });


}