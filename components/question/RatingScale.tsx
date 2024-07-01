import React from 'react';

const RatingScale = ({ scale = 10, value, setValue }: { scale?: number; value: number; setValue: (value: number) => void }) => {
  return (
    <div className='my-1 flex justify-between'>
      {Array.from({ length: scale }, (_, index) => (
        <button
          key={index}
          type='button'
          className={`flex size-10 flex-col items-center justify-center rounded-full border-4 ${value === index + 1 ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'} `}
          onClick={() => setValue(index + 1)}
        >
          <div className={`rounded-full ${value === index + 1 ? 'fill-current text-green-500' : ''}`} />
          <p className='text-xs'>{index + 1}</p>
        </button>
      ))}
    </div>
  );
};

export default RatingScale;
