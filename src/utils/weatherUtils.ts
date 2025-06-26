export const getWeatherBackgroundGradient = (condition: string, isDay: boolean = true): string => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return isDay 
      ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'
      : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black';
  }
  
  if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    return isDay
      ? 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600'
      : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
  }
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800';
  }
  
  if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900';
  }
  
  if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300';
  }
  
  if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
  }
  
  // Default gradient
  return isDay
    ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'
    : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black';
};

export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};

export const formatTemperature = (temp: number, unit: 'C' | 'F'): string => {
  return `${Math.round(temp)}°${unit}`;
};

export const getWindDirection = (degrees: number): string => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};