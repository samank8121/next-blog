import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { getAllPosts } from './actions';

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>My Blog</h1>
      <div className='grid gap-6 md:grid-cols-2'>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/post/${post.id}`} className='hover:underline'>
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>
                {post.author} - {new Date(post.date).toDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.content.substring(0, 150)}...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
