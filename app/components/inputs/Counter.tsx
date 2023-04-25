"use client";

import { memo } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = () => {
    onChange(value + 1);
  };
  const onReduce = () => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  };
  return (
    <div className="flex flex-row items-center justify-between ">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4 ">
        <div
          onClick={onReduce}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-500 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl font-light text-neutral-600 ">{value}</div>
        <div className="flex flex-row items-center gap-4 ">
          <div
            onClick={onAdd}
            className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-500 cursor-pointer hover:opacity-80 transition"
          >
            <AiOutlinePlus />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Counter);
