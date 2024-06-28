import { useFunnel } from '@/components/funnel';
import { useProgress, ProgressBar } from '@/components/progress';
import { MultipleChoice, MultipleChoices, ShortAnswer } from '@/components/question';
import React, { Fragment } from 'react';

const QUESTION_STEPS = ['1번 문제', '2번 문제', '3번 문제'];

const QuestionsPage = () => {
  const { Funnel, Step, setStep } = useFunnel(QUESTION_STEPS[0]);
  const { currentStep, setCurrentStep, progress } = useProgress(QUESTION_STEPS);

  const goToNextStep = () => {
    const nextIndex = Math.min(QUESTION_STEPS.indexOf(currentStep) + 1, QUESTION_STEPS.length - 1);
    const nextStep = QUESTION_STEPS[nextIndex];
    setStep(nextStep);
    setCurrentStep(nextStep);
  };

  const goToPrevStep = () => {
    const prevIndex = Math.max(QUESTION_STEPS.indexOf(currentStep) - 1, 0);
    const prevStep = QUESTION_STEPS[prevIndex];
    setStep(prevStep);
    setCurrentStep(prevStep);
  };

  const goToStep = (index: number) => {
    const targetStep = QUESTION_STEPS[index];
    setStep(targetStep);
    setCurrentStep(targetStep);
  };

  return (
    <Fragment>
      <ProgressBar progress={progress} step={QUESTION_STEPS} onClick={goToStep} />
      <Funnel>
        <Step name={QUESTION_STEPS[0]}>
          <MultipleChoice onNext={goToNextStep} onPrev={goToPrevStep} />
        </Step>
        <Step name={QUESTION_STEPS[1]}>
          <ShortAnswer onNext={goToNextStep} onPrev={goToPrevStep} />
        </Step>
        <Step name={QUESTION_STEPS[2]}>
          <MultipleChoices onNext={goToNextStep} onPrev={goToPrevStep} />
        </Step>
      </Funnel>
    </Fragment>
  );
};

export default QuestionsPage;
