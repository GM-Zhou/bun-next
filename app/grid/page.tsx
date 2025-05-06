import './index.css';

const GridPage = () => {
  return (
    <div className='grid grid-cols-1 gap-4 p-4 content'>
      <div className='bg-gray-200 p-4 rounded'>Item 1</div>
      <div className='bg-gray-200 p-4 rounded'>Item 2</div>
      <div className='bg-gray-200 p-4 rounded'>Item 3</div>
      <div className='bg-gray-200 p-4 rounded'>Item 4</div>
    </div>
  );
};

export default GridPage;
