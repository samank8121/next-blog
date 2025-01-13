'use server';

import prisma from '@/lib/data/prisma';
import { revalidatePath } from 'next/cache';

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      date: 'desc',
    },
  });
  return posts;
}

export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { comments: true },
  });
  return post;
}

export async function createComment(
  postId: string,
  author: string,
  content: string
) {
  const comment = await prisma.comment.create({
    data: {
      author,
      content,
      date: new Date(),
      postId,
    },
  });
  revalidatePath(`/post/${postId}`);
  return comment;
}
