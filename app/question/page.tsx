'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { useFunnel } from '@/components/funnel';
import { ProgressBar, useProgress } from '@/components/progress';
import type { NavigationButtonsProps } from '@/components/progress/NavigationButtons';
import Question from '@/components/question/Question';
import { DASHBOARD, HOME } from '@/constants/route-helper';
import { getQuestions } from '@/data/services';
import { useAnswersStore } from '@/store/zustand/questions';

import { postSurveyQuery } from './services';

const QuestionsPage = () => {
  const router = useRouter();
  const { data } = getQuestions();
  const { answers, clearAnswers } = useAnswersStore();

  const QUESTION_STEPS = data.map((question) => question.title.content);
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

  const goToDashboard = () => {
    router.push(DASHBOARD);
  };

  const onSubmit = () => {
    postSurveyQuery({
      answers,
      nextFunc: () => {
        goToDashboard();
        clearAnswers();
      },
    });
  };

  const navigateHandler: NavigationButtonsProps = {
    onNext: goToNextStep,
    onPrev: goToPrevStep,
    disabled: false,
  };

  const navigateHandlerFirst: NavigationButtonsProps = {
    onNext: goToNextStep,
    onPrev: () => router.push(HOME),
    disabled: false,
  };

  const navigateHandlerLast: NavigationButtonsProps = {
    onNext: onSubmit,
    onPrev: goToPrevStep,
    disabled: false,
  };

  return (
    <div className='p-4'>
      <ProgressBar progress={progress} steps={QUESTION_STEPS} onClick={goToStep} />
      <Funnel>
        <Step name={QUESTION_STEPS[0]}>
          <Question {...data[0]} {...navigateHandlerFirst} />
        </Step>
        <Step name={QUESTION_STEPS[1]}>
          <Question {...data[1]} {...navigateHandler} />
        </Step>
        <Step name={QUESTION_STEPS[2]}>
          <Question {...data[2]} {...navigateHandler} />
        </Step>
        <Step name={QUESTION_STEPS[3]}>
          <Question {...data[3]} {...navigateHandlerLast} />
        </Step>
      </Funnel>
    </div>
  );
};

export default QuestionsPage;
