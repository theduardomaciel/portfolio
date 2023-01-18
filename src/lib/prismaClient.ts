/* import { PrismaClient } from '@prisma/client/edge'

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

const prisma =
    global.prisma ||
    new PrismaClient() // { log: ['query']}

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma; */

import type { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'development') {
    import('@prisma/client').then(mod => (prisma = new mod.PrismaClient()));
} else {
    import('@prisma/client/edge').then(mod => (prisma = new mod.PrismaClient()));
}
export default prisma;