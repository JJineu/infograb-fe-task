'use client';

import { useRouter } from 'next/navigation';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useEffect, useState } from 'react';

import { QUESTION } from '@/constants/route-helper';

import { getUserQuery, postUserQuery } from './services';

const UserForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', team: '' });
  const isAvailable = user.name && user.team;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    postUserQuery({ user, nextFunc: () => router.push(QUESTION) });
  };

  useEffect(() => {
    getUserQuery().then(setUser);
  }, []);

  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <FormInput placeholder='팀을 입력하세요.' value={user.team} onChange={handleChange} name='team' />
      <FormInput placeholder='이름을 입력하세요.' value={user.name} onChange={handleChange} name='name' />
      <button className={`${isAvailable ? 'btn-basic-green' : 'btn-basic-slate'}`} type='submit'>
        설문 시작하기
      </button>
    </form>
  );
};

export default UserForm;

const FormInput = ({ placeholder, value, onChange, ...rest }: { placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; [key: string]: any }) => (
  <input className='input-default' type='text' placeholder={placeholder} value={value} onChange={onChange} required {...rest} />
);
