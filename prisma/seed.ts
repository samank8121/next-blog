import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.post.deleteMany()
  await prisma.comment.deleteMany()

  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with Next.js',
      content: 'Next.js is a powerful React framework that makes building web applications a breeze...',
      author: 'Jane Doe',
      date: new Date('2023-07-01'),
      comments: {
        create: [
          {
            author: 'Alice',
            content: 'Great introduction to Next.js!',
            date: new Date('2023-07-02'),
          },
          {
            author: 'Bob',
            content: 'I found this very helpful. Thanks!',
            date: new Date('2023-07-03'),
          },
        ],
      },
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'The Power of shadcn UI',
      content: 'shadcn UI provides a set of accessible and customizable React components that can significantly speed up your development process...',
      author: 'John Smith',
      date: new Date('2023-07-05'),
      comments: {
        create: [
          {
            author: 'Charlie',
            content: 'I love using shadcn UI in my projects!',
            date: new Date('2023-07-06'),
          },
        ],
      },
    },
  })

  console.log({ post1, post2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

