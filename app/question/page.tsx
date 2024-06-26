import { useFunnel } from '@/components/funnel/useFunnel';
import { MultipleChoice, MultipleChoices, ShortAnswer } from '@/components/question';
import React from 'react';

const steps = ['1번 문제', '2번 문제', '3번 문제'];

const QuestionsPage = () => {
  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  return (
    <Funnel>
      <Step name='1번 문제'>
        <MultipleChoice />
      </Step>
      <Step name='2번 문제'>
        <ShortAnswer />
      </Step>
      <Step name='3번 문제'>
        <MultipleChoices />
      </Step>
    </Funnel>
  );
};

export default QuestionsPage;
