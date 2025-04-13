'use client';

import { createStore } from '@/store/zustand';

const store = createStore({
  count: 0,
  name: 'Zustand Store'
});

const ZustandPage = () => {
  const { count, name } = store.useStore((state) => state);

  const setCount = (newCount: number) => {
    store.setState({ count: newCount });
  };

  const increment = () => {
    store.setState((state) => ({ count: state.count + 1 }));
  };

  const decrement = () => {
    store.setState((state) => ({ count: state.count - 1 }));
  };

  const reset = () => {
    store.setState({ count: 0 });
  };

  return (
    <div className='max-w-2xl mx-auto p-8'>
      <h1 className='text-3xl font-bold mb-4'>{name}</h1>
      <p className='text-gray-600 mb-2'>Simple state management library for React.</p>
      <p className='text-gray-600 mb-6'>Check the console for state changes.</p>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <p className='text-2xl font-semibold mb-4'>Count: {count}</p>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
          <button
            onClick={increment}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
          >
            Increment
          </button>
          <button
            onClick={decrement}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'
          >
            Decrement
          </button>
          <button
            onClick={reset}
            className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors'
          >
            Reset
          </button>
          <button
            onClick={() => setCount(10)}
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors'
          >
            Set Count to 10
          </button>
          <button
            onClick={() => setCount(20)}
            className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors'
          >
            Set Count to 20
          </button>
          <button
            onClick={() =>
              store.setState({
                count,
                name: Number(Math.random() * 1000).toString()
              })
            }
            className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors'
          >
            change name
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZustandPage;
