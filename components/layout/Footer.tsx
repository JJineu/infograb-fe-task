import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div className='m-2 flex h-[30px] justify-end'>
      <Image width={150} height={30} src='/assets/logo-dark.png' alt='logo' />
    </div>
  );
};

export default Footer;
