'use client'

import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react"
import NextTopLoader from 'nextjs-toploader';

export const Provaider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider> {children} </SessionProvider>
      <Toaster position="bottom-right" />
      <NextTopLoader />
    </>
  );
};
