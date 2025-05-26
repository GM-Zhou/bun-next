interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SSR({ params }: PageProps) {
  const resolvedParams = await params;

  if (!resolvedParams.id) {
    return <div>Error: ID is required</div>;
  }

  return (
    <article>
      <h1 className='text-2xl font-bold'>SSR Post: {resolvedParams.id}</h1>
    </article>
  );
}

// 可选：生成静态路径
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}
