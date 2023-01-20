import { PrismaClient } from "@prisma/client"

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

const prisma =
    global.prisma ||
    new PrismaClient({
        datasources: {
            db: {
                url: import.meta.env.DATABASE_URL,
            },
        },
    }) // { log: ['query']}

if (import.meta.env.NODE_ENV !== "production") global.prisma = prisma

export default prisma;