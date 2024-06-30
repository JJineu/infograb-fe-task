import React from 'react';

const ProgressBar = ({ progress, steps, onClick }: { progress: number; steps: string[]; onClick: (index: number) => void }) => {
  const calculateProgress = (index: number, stepsLength: number) => progress > (index / stepsLength) * 100;

  return (
    <div className='relative flex h-10 justify-between'>
      <div className='absolute left-0 top-4 h-2 bg-blue-500 transition-all duration-200 ease-linear' style={{ width: `${progress}%` }} />
      {steps.map((step, index) => (
        <div
          key={step}
          className={`z-10 -mr-2 mt-[7px] size-7 rounded-full border-2 text-center text-white ${calculateProgress(index + 1, steps.length) ? 'border-transparent bg-green-500' : 'border-slate-300 bg-white'}`}
          onClick={() => calculateProgress(index + 1, steps.length) && onClick(index)}
        >
          {calculateProgress(index + 1, steps.length) ? '✓' : ''}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
