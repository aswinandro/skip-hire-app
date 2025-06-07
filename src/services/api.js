export const fetchSkipsByLocation = async (postcode = 'NR32', area = 'Lowestoft') => {
  try {
    const response = await fetch(`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in fetchSkipsByLocation:', error);
    throw error;
  }
};
