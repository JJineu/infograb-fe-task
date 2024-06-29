'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { HOME } from '@/constants/route-helper';

const Header = () => {
  const router = useRouter();
  const goToHome = () => router.push(HOME);

  return (
    <div className='flex justify-between'>
      <div onClick={goToHome}>홈</div>
      <p>안녕하세요! InfoGrab 설문조사 페이지에 오신 것을 환영합니다.</p>
    </div>
  );
};

export default Header;
