import React from "react";
import "../globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Container, Header } from "@/components/shared";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "UPizza | Оформлення замовлення",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn("min-h-screen bg-background", nunito.className)}>
      <Container>
        <Header hasSearch={false} hasCart={false} />
        {children}
      </Container>
    </main>
  );
}
