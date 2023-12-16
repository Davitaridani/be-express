const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
   getAllRtp: async () => {
      try {
         const result = await prisma.rtp.findMany()
         return result
      } catch (error) {
         throw new Error("Something went wrong")
      }
   }
}