import React from 'react';

const AnswerInput = ({ ...props }) => {
  return (
    <div>
      <input type='text' {...props} />
    </div>
  );
};

export default AnswerInput;
