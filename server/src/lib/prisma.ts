import { PrismaClient } from "@prisma/client";

/*- initialize and export prisma instance -*/
export const prisma = new PrismaClient({
  log: ['query']
})