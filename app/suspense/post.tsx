interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function Post() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  const post: Post = await response.json();

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  );
}
