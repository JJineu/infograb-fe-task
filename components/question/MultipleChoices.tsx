import React from 'react';

import AnswerChoice from './AnswerChoice';

const MultipleChoices = ({
  choices = [],
  selectedValue = [],
  setSelectedValue,
}: {
  choices: { id: string; value: number; content: string }[];
  selectedValue: { id: string; value: number }[];
  setSelectedValue: ({ id, value }: { id: string; value: number }) => void;
}) => {
  return (
    <div>
      {choices.map((choice, index) => (
        <AnswerChoice
          key={choice.id}
          index={index + 1}
          {...choice}
          isSelected={selectedValue.some((selected) => selected.id === choice.id)}
          selectValue={() =>
            setSelectedValue({
              id: choice.id,
              value: choice.value,
            })
          }
        />
      ))}
    </div>
  );
};

export default MultipleChoices;
