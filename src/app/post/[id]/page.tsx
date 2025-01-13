import { notFound } from 'next/navigation'
import CommentSection from '@/components/comment-section'
import { getPostById } from '@/app/actions';

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.author} - {new Date(post.date).toDateString()}</p>
      <div className="prose max-w-none mb-8">
        <p>{post.content}</p>
      </div>
      <CommentSection postId={post.id} initialComments={post.comments} />
    </div>
  )
}