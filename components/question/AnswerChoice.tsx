import React from 'react';

const AnswerChoice = ({ index, content }) => {
  return (
    <div key={`${index}-${content}`}>
      <span>{index + 1}. </span>
      <span>{content}</span>
    </div>
  );
};

export default AnswerChoice;
