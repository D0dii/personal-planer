const getNewTime = () => {
  const date = new Date();
  const minutes = Math.floor(date.getMinutes() / 5) * 5;
  return date.getHours() + ":" + (minutes === 60 ? "00" : minutes);
};

export { getNewTime };
