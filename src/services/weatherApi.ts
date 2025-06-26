const API_KEY = 'Your_Api_Key'; // Users will need to replace this
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeatherData = async (location: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=yes&alerts=yes`
    );
    
    if (!response.ok) {
      throw new Error('Location not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch weather data');
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&aqi=yes&alerts=yes`
    );
    
    if (!response.ok) {
      throw new Error('Unable to fetch weather for your location');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch weather data');
  }
};