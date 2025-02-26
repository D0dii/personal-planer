export const extractTime = (date: string): string => {
  const dateTime = new Date(date);
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
