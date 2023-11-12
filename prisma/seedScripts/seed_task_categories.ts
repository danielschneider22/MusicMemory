/*run npx prisma db seed*/

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  ["General", "Exercise", "Learning", "Music", "Social"].forEach(async (category, i) => {
    const found = await prisma.taskCategory.findFirst({
      where: { name: category }
    })
    if(!found) {
      const newCategory = await prisma.taskCategory.create({
        data: {
          name: category,
          position: i,
        },
      })
      console.log(newCategory)
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })