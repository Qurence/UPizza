import type { Metadata } from 'next';
import Header from '@/components/shared/header';


export const metadata: Metadata = {
  title: "UPizza",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen'>
      <Header />
      {children}
    </main>
  );
}