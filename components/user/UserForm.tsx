'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { QUESTION } from '@/constants/route-helper';
import { setCookie } from '@/store/Cookie';
import { useUserStore } from '@/store/zustand/user';

const UserForm = () => {
  const router = useRouter();
  const { user, setName, setTeam } = useUserStore();
  const isAvailable = user.team && user.name;

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isAvailable) {
      setCookie('user_team', user.team);
      setCookie('user_name', user.name);
      router.push(QUESTION);
    } else {
      alert('팀과 이름을 모두 입력하세요.');
    }
  };

  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <input className='input-default' type='text' placeholder='팀을 입력하세요.' value={user.team} onChange={(e) => setTeam(e.target.value)} required />
      <input className='input-default' type='text' placeholder='이름을 입력하세요.' value={user.name} onChange={(e) => setName(e.target.value)} required />
      <button className={`${isAvailable ? 'btn-basic-green' : 'btn-basic-slate'}`} type='submit'>
        설문 시작하기
      </button>
    </form>
  );
};

export default UserForm;
