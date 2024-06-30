'use client';

import { House } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { HOME } from '@/constants/route-helper';

const Header = () => {
  const router = useRouter();
  const goToHome = () => router.push(HOME);

  return (
    <div className='flex h-10 items-center justify-between p-1'>
      <div className='cursor-pointer rounded-md bg-green-600 px-2 py-1 hover:bg-green-500' onClick={goToHome}>
        <House className='inline-block size-4 stroke-2 text-white hover:text-slate-50' />
      </div>
      <p className='hidden text-slate-800 sm:block'>안녕하세요! InfoGrab 설문조사 페이지에 오신 것을 환영합니다.</p>
    </div>
  );
};

export default Header;
