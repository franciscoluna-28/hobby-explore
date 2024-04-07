"use client";

import React, { useState } from "react";
import RatingIcon from "./RatingIcon";
import { useRateActivity } from "@/hooks/activities/useRateActivity";
import { Tables } from "@/lib/database";

type Props = {
  activityId: Tables<"activities_rating">["activity_id"];
};

const RatingContainer = ({ activityId }: Props) => {
  const STARTING_RATING_DEFAULT_VALUE: number = 0;
  /** InitialData can be a number with the value obtained from the API, or an array.
   *  With the first index being the initial value from the API which is updated whenever we get a positive response from the server
   *  and a value and the second one being the optimistic value */
  const { mutation, initialData } = useRateActivity({ activityId });
  const [hoverRating, setHoverRating] = useState<number>(
    STARTING_RATING_DEFAULT_VALUE
  );


  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(STARTING_RATING_DEFAULT_VALUE);
  };

  const onSaveRating = (index: number) => {
    mutation.mutate(index);
  };

  return (
    <div className="box flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <RatingIcon
          key={index}
          index={index}
          rating={
            Array.isArray(initialData)
              ? initialData[1]
              : initialData ?? STARTING_RATING_DEFAULT_VALUE
          }
          hoverRating={hoverRating}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onSaveRating={onSaveRating}
        />
      ))}
    </div>
  );
};

export default RatingContainer;
