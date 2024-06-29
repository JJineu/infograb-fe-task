'use client';

import type { JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { useState } from 'react';

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  const Step = (props: StepProps): ReactElement<any, string | JSXElementConstructor<any>> => {
    return props.children as ReactElement<any, string | JSXElementConstructor<any>>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === step);

    return targetStep;
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};
