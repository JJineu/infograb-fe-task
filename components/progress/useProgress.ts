'use client';

import { useState } from 'react';

type UseProgressReturnType = {
  currentStep: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>;
  progress: number;
};

const useProgress = (steps: string[]): UseProgressReturnType => {
  const [currentStep, setCurrentStep] = useState<string>(steps[0]);
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return {
    currentStep,
    setCurrentStep,
    progress,
  };
};

export default useProgress;
