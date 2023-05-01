"use client";
import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/userSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = locationValue
    ? getByValue(locationValue as string)?.label
    : "Any where";

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if (diff === 0) {
        diff = 1;
      }
      return `${diff} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = guestCount ? `${guestCount} Guests` : "Add Guests";

  return (
    <div
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-sm transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 text-sm font-semibold">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center  ">
          {durationLabel}
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 text-white rounded-full bg-rose-500 ">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
