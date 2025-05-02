import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <main>
      <h1>Blog Post: {params.id}</h1>
      <div className='w-2xs'>
        <p className='text-justify'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores repudiandae qui facilis
          numquam aut animi porro asperiores perferendis voluptatem in iusto ipsum mollitia
          consequatur ipsa voluptatum, pariatur et rerum libero.
        </p>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Blog Post',
  description: 'This is the blog post page'
};

export const generateStaticParams = async () => {
  const posts = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }));
  return posts;
};
