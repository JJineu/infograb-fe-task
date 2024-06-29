import React from 'react';

const ProgressBar = ({ progress, step, onClick }: { progress: number; step: string[]; onClick: (index: number) => void }) => {
  return (
    <div className='relative flex h-10 justify-evenly'>
      <div className='absolute left-0 top-4 h-2 bg-blue-600' style={{ width: `${progress}%` }} />
      {step.map((_, index) => (
        <div
          key={index}
          className='z-10 size-10 rounded-full bg-blue-400 text-center'
          onClick={() => {
            onClick(index);
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
