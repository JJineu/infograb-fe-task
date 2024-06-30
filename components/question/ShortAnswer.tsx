import React from 'react';

const ShortAnswer = ({ value, setValue }: { value: number; setValue: (value: number) => void }) => {
  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자 1~10 사이의 정수값만 받아야 합니다.
    if (Number(e.target.value) < 1 || Number(e.target.value) > 10 || !Number.isInteger(Number(e.target.value))) {
      alert('1부터 10 사이의 정수값만 입력해주세요.');
      return;
    }
    setValue(Number(e.target.value));
  };

  return (
    <div>
      <input type='number' step={1} value={value} onChange={handleSetValue} />
    </div>
  );
};

export default ShortAnswer;
