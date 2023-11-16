import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

//let prisma: PrismaClient;

export const prisma =
  global.prisma ||
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
/*
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
export default prisma;
*/