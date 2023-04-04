export const getRandomInt = (min: number, max: number) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

export const capitalizeSentence = (sentence: string) => {
  return sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getIsoFormattedDate = (timestamp: number | string | Date) => {
  const date = new Date(timestamp);

  if (date.toString() === "Invalid Date") return timestamp;

  return date.toISOString();
};
