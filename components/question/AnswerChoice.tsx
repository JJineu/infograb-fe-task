import React from 'react';

import { pressEnter } from '@/utils/html';

const AnswerChoice = ({ index, content, isSelected, selectValue }: { index: number; content: string; isSelected: boolean; selectValue: () => void }) => {
  return (
    <div
      className={`my-1 cursor-pointer rounded-md px-4 py-1 transition-all duration-200 ease-linear ${isSelected ? 'bg-green-200 ' : 'bg-transparent'}`}
      onClick={selectValue}
      onKeyDown={(e) => pressEnter(e, selectValue)}
      role='button'
      tabIndex={0}
    >
      <div className='inline-block w-5'>{index}. </div>
      <span>{content}</span>
    </div>
  );
};

export default AnswerChoice;
