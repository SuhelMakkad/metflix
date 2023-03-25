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
