import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Footer, Header } from '@/components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InfoGrab survey form',
  description: 'This is a survey on MBTI, psychological test, and simple quiz',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0' />
        <meta name='theme-color' content='#148756' />
      </head>
      <body className={`${inter.className} flex h-full min-h-screen w-screen flex-col bg-body-bg`}>
        <Header />
        <main className='grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
