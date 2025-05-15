import Link from 'next/link';

// export const dynamic = 'force-dynamic';

interface CacheLayoutProps {
  children: React.ReactNode;
}

export default function CacheLayout(props: CacheLayoutProps) {
  return (
    <section className='p-5'>
      <nav className='flex items-center justify-center gap-10 text-blue-600 mb-6'>
        <Link href='/about'>About</Link>
        <Link href='/settings'>Settings</Link>
      </nav>
      {props.children}
    </section>
  );
}
