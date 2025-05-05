"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { ThemeSwitcher } from "./theme-switcher";
import { CartButton } from "./cart-button";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Suspense } from "react";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderContent hasSearch={hasSearch} hasCart={hasCart} className={className} />
    </Suspense>
  );
};

function HeaderContent({ hasSearch = true, hasCart = true, className }: Props) {
  const [openAuthModal, setopenAuthModall] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (searchParams.has("verified")) {
      setTimeout(() => {
        router.replace('/');
        toast.success("Ваша пошта підтверджена", {
          icon: "✅",
        });
      }, 500);
    }
  }, [router, searchParams]);

  // console.log(session, 999);
  return (
    <div className={cn("border-b border-muted", className)}>
      <div>
        <Container className="flex items-center justify-between py-8">
          {/* Левая часть */}
          <Link href={"/"}>
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Logo" width={35} height={35} />
              <div>
                <h1 className="text-2xl uppercase font-black">
                  <span style={{ color: "#fe5f00" }}>U</span>Pizza
                </h1>
                <p className="text-sm text-gray-400 leading-3">
                  смачніше вже нікуди
                </p>
              </div>
            </div>
          </Link>

          {hasSearch && (
            <div className="mx-10 flex-1">
              <SearchInput />
            </div>
          )}

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            <AuthModal open={openAuthModal} onClose={() => setopenAuthModall(false)} />
            <ProfileButton onClickSignIn={() => setopenAuthModall(true)} />

            {hasCart && <CartButton />}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Header;
