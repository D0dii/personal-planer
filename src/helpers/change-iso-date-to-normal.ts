export const changeIsoDateToNormalFormat = (date: string) => {
  const newDate = new Date(date);
  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return (
    newDate.toLocaleDateString("en-US", optionsDate) +
    " " +
    newDate.toLocaleTimeString("en-US", optionsTime)
  );
};
