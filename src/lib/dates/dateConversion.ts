/**
 * Date constants in seconds.
 * @type {number}
 */
const MINUTE_LIMIT: number = 60;
const HOUR_LIMIT: number = 3600;
const DAY_LIMIT: number = 86400;
const MONTH_LIMIT: number = 2592000;
const YEAR_LIMIT: number = 31536000;

/**
 * Helper function to get the corresponding date plural or singular format.
 * @param {number} value - The value of the date unit.
 * @param {string} unit - The unit of the date.
 * @returns {string} The formatted date string.
 */
const getTimeString = (value: number, unit: string): string => {
  return `${value} ${value === 1 ? unit : unit + "s"}`;
};

/**
 * Converts a date string into a human-readable relative time format.
 * @param {string} dateString - The date to convert to a relative time format.
 * @returns {string} The formatted relative time string.
 */
export const handleDateConversion = (dateString: string): string => {
  // Current date
  const currentDate: Date = new Date();
  // Provided date
  const date: Date = new Date(dateString);
  // Difference in seconds between current date and provided date
  const difference: number = Math.floor(
    (currentDate.getTime() - date.getTime()) / 1000
  );

  // Render "created recently" if difference is less than 1 minute
  if (difference < MINUTE_LIMIT) {
    return "Created recently";
  }

  const AGO_STRING = "ago";

  // Check if the difference is less than each time unit limit, in descending order
  if (difference < YEAR_LIMIT) {
    const years = Math.floor(difference / YEAR_LIMIT);
    if (years > 0) {
      return `${getTimeString(years, "year")} ${AGO_STRING}`;
    }
    const months = Math.floor(difference / MONTH_LIMIT);
    if (months > 0) {
      return `${getTimeString(months, "month")} ${AGO_STRING}`;
    }
    const days = Math.floor(difference / DAY_LIMIT);
    if (days > 0) {
      return `${getTimeString(days, "day")} ${AGO_STRING}`;
    }
    const hours = Math.floor(difference / HOUR_LIMIT);
    if (hours > 0) {
      return `${getTimeString(hours, "hour")} ${AGO_STRING}`;
    }
    const minutes = Math.floor(difference / MINUTE_LIMIT);
    return `${getTimeString(minutes, "minute")} ${AGO_STRING}`;
  }

  // If none of the above conditions are met, default to "created recently"
  return "Created recently";
};
