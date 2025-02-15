export const getTimeForEvent = (time: string, date: Date) => {
  const dateTime = new Date(date);
  const [hour, minute] = time.split(":").map(Number);
  dateTime.setHours(hour, minute);
  return dateTime;
};
