import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div className='float-right m-2'>
      <Image width={200} height={100} src='/assets/logo-dark.png' alt='logo' />
    </div>
  );
};

export default Footer;
