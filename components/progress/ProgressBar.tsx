import React from 'react';

const ProgressBar = ({ progress, step, onClick }: { progress: number }) => {
  return (
    <div className='bg-blue-600 h-2' style={{ width: `${progress}%` }}>
      {step.map((_, index) => (
        <div
          key={index}
          className='rounded-full'
          onClick={() => {
            onClick(index);
          }}
        >
          {step[index]}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
