interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function Post() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    next: { revalidate: 1 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const post: Post = await response.json();

  return (
    <article>
      <h2 className='text-xl font-bold'>{post.title}</h2>
      <p className='text-gray-700'>{post.body}</p>
    </article>
  );
}
