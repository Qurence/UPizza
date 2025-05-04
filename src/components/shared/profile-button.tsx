import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui";
import Link from "next/link";
import { CircleUser, User } from "lucide-react";

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
}) => {
  const { data: session } = useSession(); // useSession() - Uncomment this line when using session

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant={"outline"}
          className="flex items-center gap-1"
        >
          <User size={16} />
          Увійти
        </Button>
      ) : (
        <Link href={"/profile"} className="flex items-center gap-2">
          <Button
            variant={"outline"}
            className="flex items-center gap-1"
          >
            <CircleUser size={16} />
            Профіль
          </Button>
        </Link>
      )}
    </div>
  );
};
