export const getBookDetails = async (url) => {
  try {
    const fetchBookDetails = await fetch(url);
    const fetchJson = await fetchBookDetails.json();
    return fetchJson;
  } catch (error) {
    alert(`error: ${error}`);
  }
};
