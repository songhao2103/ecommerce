export const getDatas = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error fetching data: ", error);
    throw error;
  }
};
