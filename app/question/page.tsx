'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { useFunnel } from '@/components/funnel';
import { ProgressBar, useProgress } from '@/components/progress';
import type { NavigationButtonsProps } from '@/components/progress/NavigationButtons';
import Question from '@/components/question/Question';
import { DASHBOARD, HOME } from '@/constants/route-helper';
import { getQuestions, postSurvey } from '@/data/services';
import { useAnswersStore } from '@/store/zustand/questions';
import { useUserStore } from '@/store/zustand/user';

const QUESTION_STEPS = ['1번 문제', '2번 문제', '3번 문제'];

const QuestionsPage = () => {
  const router = useRouter();
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

  const { answers, clearAnswers } = useAnswersStore();
  const { user } = useUserStore();

  const onSubmit = async () => {
    alert('설문이 완료되었습니다. 감사합니다.');
    const answersArray = Object.keys(answers).map((key) => {
      return {
        titleId: key,
        sum: answers[key].sum,
      };
    });

    await postSurvey(user.team, answersArray);

    clearAnswers();
    router.push(DASHBOARD);
    // try {
    //   await fetch('/api/survey', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(answersArray),
    //   });
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  const navigateHandler: NavigationButtonsProps = {
    onNext: goToNextStep,
    onPrev: goToPrevStep,
    disabled: false,
  };

  const navigateHandlerFirst: NavigationButtonsProps = {
    onNext: goToNextStep,
    onPrev: () => router.push(HOME),
    disabled: true,
  };

  const navigateHandlerLast: NavigationButtonsProps = {
    onNext: onSubmit,
    onPrev: goToPrevStep,
    disabled: false,
  };

  const { data } = getQuestions();

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
          <Question {...data[2]} {...navigateHandlerLast} />
        </Step>
      </Funnel>
    </div>
  );
};

export default QuestionsPage;
