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
        <Container>
          {/* Десктопная версия: лого, поиск и кнопки в одной строке */}
          <div className="hidden md:flex items-center justify-between py-6">
            {/* Левая часть - лого */}
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

            {/* Центральная часть - поиск */}
            {hasSearch && (
              <div className="mx-10 flex-1">
                <SearchInput className="w-full" />
              </div>
            )}

            {/* Правая часть - действия пользователя */}
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <ProfileButton onClickSignIn={() => setopenAuthModall(true)} />
              {hasCart && <CartButton />}
            </div>
          </div>

          {/* Мобильная версия: лого и кнопки в первой строке, поиск во второй */}
          <div className="md:hidden">
            <div className="flex items-center justify-between py-4">
              {/* Левая часть - лого */}
              <Link href={"/"}>
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Logo" width={30} height={30} />
                  <div>
                    <h1 className="text-xl uppercase font-black">
                      <span style={{ color: "#fe5f00" }}>U</span>Pizza
                    </h1>
                    <p className="text-xs text-gray-400 leading-3">
                      смачніше вже нікуди
                    </p>
                  </div>
                </div>
              </Link>

              {/* Правая часть - действия пользователя */}
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <ProfileButton onClickSignIn={() => setopenAuthModall(true)} />
                {hasCart && <CartButton />}
              </div>
            </div>

            {/* Строка поиска только на мобильных */}
            {hasSearch && (
              <div className="pb-4 w-full">
                <SearchInput className="w-full" defaultExpanded={true} />
              </div>
            )}
          </div>

          <AuthModal open={openAuthModal} onClose={() => setopenAuthModall(false)} />
        </Container>
      </div>
    </div>
  );
}

export default Header;
