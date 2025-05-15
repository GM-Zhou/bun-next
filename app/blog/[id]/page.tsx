import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${1}`, {});
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  const post = await res.json();
  console.log('post', post);
  return (
    <main>
      <h1 className='text-2xl font-bold'>Blog Post: {params.id}</h1>
      <div className='w-2xs'>
        <p className='text-justify text-gray-700'>{post.body}</p>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Blog Post',
  description: 'This is the blog post page'
};

export const generateStaticParams = async () => {
  const posts = Array.from({ length: 5 }, (_, i) => ({ id: i.toString() }));
  return posts;
};
