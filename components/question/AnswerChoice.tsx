import React from 'react';

import { pressEnter } from '@/utils/html';

const AnswerChoice = ({ index, content, isSelected, selectValue }: { index: number; content: string; isSelected: boolean; selectValue: () => void }) => {
  return (
    <div className={`cursor-pointer ${isSelected && ''}`} onClick={selectValue} onKeyDown={(e) => pressEnter(e, selectValue)} role='button' tabIndex={0}>
      <span>{index}. </span>
      <span>{content}</span>
    </div>
  );
};

export default AnswerChoice;
