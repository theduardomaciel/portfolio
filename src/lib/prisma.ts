/* import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma; */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient(/* {
        log: ['query'],
    } */);

if (import.meta.env.DEV) globalForPrisma.prisma = prisma;

export default prisma;
