import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  return <h1>Blog Post: {params.id}</h1>;
}

export const metadata: Metadata = {
  title: 'Blog Post',
  description: 'This is the blog post page'
};
