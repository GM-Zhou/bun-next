import { Suspense } from 'react';

import Post from './post';
import { sleep } from './uitls';

async function PostFeed() {
  await sleep(2000);
  return <h1>Hello PostFeed</h1>;
}

async function Weather() {
  await sleep(5000);
  return <h1>Hello Weather</h1>;
}

async function Recommend() {
  await sleep(4000);
  return <h1>Hello Recommend</h1>;
}

export default function SuspensePage() {
  return (
    <section className='p-5'>
      {/* 按组件数据的返回时间渲染组件 */}
      <Suspense fallback={<p>Loading PostFeed Component</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading Weather Component</p>}>
        <Weather />
      </Suspense>
      <Suspense fallback={<p>Loading Recommend Component</p>}>
        <Recommend />
      </Suspense>
      {/* <Suspense fallback={<p>Loading Post Component</p>}>
        <PostLazy />
      </Suspense> */}
      <Post />
      {/* Weather 和 Suspense 会同时出现，终究还是并行请求的 */}
      {/* <Suspense fallback={<p>Loading PostFeed Component</p>}>
        <PostFeed />
        <Suspense fallback={<p>Loading Weather Component</p>}>
          <Weather />
          <Suspense fallback={<p>Loading Recommend Component</p>}>
            <Recommend />
          </Suspense>
        </Suspense>
      </Suspense> */}
    </section>
  );
}
