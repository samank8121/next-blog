'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { createComment } from '@/app/actions';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: Date;
}

export default function CommentSection({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const comment = await createComment(postId, 'Anonymous', newComment);
      setComments([...comments, comment]);
      setNewComment('');
      router.refresh();
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Comments</h2>
      {comments.map((comment) => (
        <Card key={comment.id} className='mb-4'>
          <CardHeader>
            <CardTitle>
              {comment.author} - {new Date(comment.date).toDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{comment.content}</p>
          </CardContent>
        </Card>
      ))}
      <form onSubmit={handleSubmit} className='mt-6'>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='Write a comment...'
          className='mb-2'
        />
        <Button type='submit'>Add Comment</Button>
      </form>
    </div>
  );
}
