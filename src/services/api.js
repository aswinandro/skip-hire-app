export const fetchSkipsByLocation = async (postcode, area) => {
  try {
    const response = await fetch(
      `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform API data to match our needs
    return data.map(skip => ({
      id: skip.id,
      size: skip.size,
      price: skip.price_before_vat,
      hirePeriod: `${skip.hire_period_days} day hire period`,
      restrictions: [
        ...(!skip.allowed_on_road ? ['Not Allowed On The Road'] : []),
        ...(!skip.allows_heavy_waste ? ['Not Suitable for Heavy Waste'] : [])
      ],
      vat: skip.vat,
      totalPrice: skip.price_before_vat + skip.vat
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};