import React from 'react';
import '../globals.css';
import type { Metadata } from 'next';
// import { Providers } from './providers';
import { Nunito } from 'next/font/google';
// import Header from '@/components/shared/header';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "UPizza",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <main className='min-h-screen'>
          {/* <Header /> */}
          {children}
          </main>
      </body>
    </html>
  );
}
