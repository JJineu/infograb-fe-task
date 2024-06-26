import React from 'react';
import QuestionTitle from './QuestionTitle';
import AnswerChoice from './AnswerChoice';

const MultipleChoice = ({ answerCount = 5 }) => {
  return (
    <div>
      <QuestionTitle title='What is your favorite color?' />
      {Array.from({ length: answerCount }).map((_, index) => (
        <AnswerChoice index={index} key={index} content='Red' />
      ))}
    </div>
  );
};

export default MultipleChoice;
