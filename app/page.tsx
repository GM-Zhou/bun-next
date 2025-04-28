import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'bun-next',
  description: 'bun 构建的 next 学习项目'
};

export default function Page() {
  return <div>Welcome to Bun Next!</div>;
}
