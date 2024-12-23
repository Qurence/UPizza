import type { Metadata } from 'next';
import Header from '@/components/shared/header';


export const metadata: Metadata = {
  title: "UPizza",
}

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen'>
      <Header />
      {modal}
      {children}
    </main>
  );
}
