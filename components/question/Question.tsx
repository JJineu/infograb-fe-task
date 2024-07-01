import React from 'react';

import { useAnswersStore } from '@/store/zustand/questions';

import type { NavigationButtonsProps } from '../progress/NavigationButtons';
import NavigationButtons from '../progress/NavigationButtons';
import MultipleChoice from './MultipleChoice';
import MultipleChoices from './MultipleChoices';
import QuestionTitle from './QuestionTitle';
import RatingScale from './RatingScale';
import ShortAnswer from './ShortAnswer';

export const QUESTION_TYPES: { [key: string]: string } = {
  SHORT_ANSWER: 'SHORT_ANSWER',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  MULTIPLE_CHOICES: 'MULTIPLE_CHOICES',
  RATING_SCALE: 'RATING_SCALE',
};

const QUESTION_COMPONENTS: any = {
  [QUESTION_TYPES.MULTIPLE_CHOICES]: MultipleChoices,
  [QUESTION_TYPES.SHORT_ANSWER]: ShortAnswer,
  [QUESTION_TYPES.MULTIPLE_CHOICE]: MultipleChoice,
  [QUESTION_TYPES.RATING_SCALE]: RatingScale,
};

export interface QuestionProps {
  title: { id: string; content: string };
  type: keyof typeof QUESTION_TYPES;
  choices?: { id: string; value: number; content: string }[];
}

const Question = ({ title, type, choices, onNext, onPrev }: QuestionProps & NavigationButtonsProps) => {
  const QuestionComponent = QUESTION_COMPONENTS[type];
  const { setAnswer, setChoiceAnswer, answers } = useAnswersStore();
  const disabledOnNext = !answers[title.id] || !answers[title.id].sum || (type === QUESTION_TYPES.MULTIPLE_CHOICE && !answers[title.id].selectedIds);

  return (
    <div>
      <QuestionTitle title={title.content} />
      <QuestionComponent
        choices={choices}
        value={answers[title.id]?.sum || 0}
        selectedValue={answers[title.id]?.selectedIds}
        setValue={(data: number) => setAnswer({ value: data, type, titleId: title.id })}
        setSelectedValue={(data: { id: string; value: number }) => setChoiceAnswer({ selectedId: data, titleId: title.id, type })}
      />
      <NavigationButtons disabled={disabledOnNext} onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default Question;
