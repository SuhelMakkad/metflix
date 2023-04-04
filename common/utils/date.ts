export const getFormattedDate = (
  str: string | number | Date,
  options?: Intl.DateTimeFormatOptions
) => {
  if (typeof str === "string") {
    str = parseInt(str);
    if (isNaN(str)) return str;
  }

  options = options ?? {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateTimeFormat = new Intl.DateTimeFormat("en", options);

  return dateTimeFormat.format(str);
};

export const getIsoFormattedDate = (timestamp: number | string | Date) => {
  const date = new Date(timestamp);

  if (date.toString() === "Invalid Date") return timestamp;

  return date.toISOString();
};
