const getAllEventsCount = () => {
  const events = JSON.parse(
    localStorage.getItem("personal-planer-events") || "[]",
  );
  return events.length;
};

export { getAllEventsCount };
