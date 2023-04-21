"use client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      alt="avatar"
      className="rounded-full"
      height={30}
      width={30}
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
