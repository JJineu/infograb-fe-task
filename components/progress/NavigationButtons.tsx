import React from 'react';

const NavigationButtons = ({ onNext, onPrev, disabled }: NavigationButtonsProps) => {
  return (
    <div className='flex justify-between'>
      <button className='btn-basic-green' type='button' onClick={onPrev}>
        Prev
      </button>
      <button className={`${!disabled ? 'btn-basic-green' : 'btn-basic-slate'}`} type='button' onClick={() => !disabled && onNext()}>
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;

export interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  disabled: boolean;
}
