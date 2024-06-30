import React from 'react';

const Loading = () => {
  return (
    <div className='fixed left-1/2 top-1/2 z-[100] flex size-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-slate-50 opacity-75 md:ml-20 dark:bg-zink-700'>
      <div className='loader-loading mb-36 h-[38px] w-[200px] overflow-hidden ' />
    </div>
  );
};

export default Loading;
