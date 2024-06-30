import React from 'react';

const NavigationButtons = ({ onNext, onPrev }: NavigationButtonsProps) => {
  return (
    <div>
      <button type='button' onClick={onPrev}>
        Prev
      </button>
      <button type='button' onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;

export interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
}
