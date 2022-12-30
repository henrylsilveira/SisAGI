import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['query'],
});
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
        log: ['query'],
    });
  }
  prisma = global.prisma;
}

export { prisma };