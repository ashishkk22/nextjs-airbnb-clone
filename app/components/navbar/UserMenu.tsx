"use client";
import React, { useReducer } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/userLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, toggleOpen] = useReducer(state => !state, false);

  const onRent = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-sm w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          {currentUser ? (
            <>
              <MenuItem
                onClick={() => router.push("/trips")}
                label="My trips"
              />
              <MenuItem
                onClick={() => router.push("/favorites")}
                label="My favorites"
              />
              <MenuItem
                onClick={() => router.push("/reservations")}
                label="My reservations"
              />
              <MenuItem
                onClick={() => router.push("/properties")}
                label="My properties"
              />
              <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
              <hr />

              <MenuItem onClick={() => signOut()} label="Logout" />
            </>
          ) : (
            <>
              <MenuItem onClick={loginModal.onOpen} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
