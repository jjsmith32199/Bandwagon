export const getSavedItineraryIds = () => {
  const savedItineraryIds = localStorage.getItem("saved_itineraries")
    ? JSON.parse(localStorage.getItem("saved_itineraries"))
    : [];

  return savedItineraryIds;
};

export const saveItineraryIds = (itineraryIdArr) => {
  if (itineraryIdArr.length) {
    localStorage.setItem("saved_itineraries", JSON.stringify(itineraryIdArr));
  } else {
    localStorage.removeItem("saved_itineraries");
  }
};

export const removeItineraryId = (itineraryId) => {
  const savedItineraryIds = localStorage.getItem("saved_itineraries")
    ? JSON.parse(localStorage.getItem("saved_itineraries"))
    : null;

  if (!savedItineraryIds) {
    return false;
  }

  const updatedSavedItineraryIds = savedItineraryIds?.filter(
    (savedItineraryId) => savedItineraryId !== itineraryId
  );
  localStorage.setItem(
    "saved_itineraries",
    JSON.stringify(updatedSavedItineraryIds)
  );

  return true;
};
