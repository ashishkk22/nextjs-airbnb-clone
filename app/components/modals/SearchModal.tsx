"use client";
import useSearchModal from "@/app/hooks/userSearchModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE,
  INFO,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = () => {
    setStep(value => value - 1);
  };
  const onNext = () => {
    setStep(value => value + 1);
  };

  const onSubmit = async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: Record<string, string | number | undefined> = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  };

  const actionLabel = step === STEPS.INFO ? "Search" : "Next";

  const secondaryActionLabel = step === STEPS.LOCATION ? undefined : "back";

  const diffBodyContent: Record<STEPS, JSX.Element> = {
    0: (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you wanna go ? "
          subtitle="Find a perfect location"
        />
        <CountrySelect
          value={location}
          onChange={value => setLocation(value as CountrySelectValue)}
        />
        <hr />
        <Map center={location?.latlng} />
      </div>
    ),
    1: (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={value => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    ),
    2: (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          onChange={value => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={value => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={value => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    ),
  };

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={diffBodyContent[step]}
    />
  );
};

export default SearchModal;
