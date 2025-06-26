import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherForecast } from './components/WeatherForecast';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useGeolocation } from './hooks/useGeolocation';
import { fetchWeatherData, fetchWeatherByCoords } from './services/weatherApi';
import { WeatherData } from './types/weather';
import { CloudSun, Thermometer } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const { coordinates, error: geoError, loading: geoLoading, getCurrentPosition } = useGeolocation();

  const handleSearch = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    getCurrentPosition();
  };

  // Fetch weather data when coordinates are available
  useEffect(() => {
    if (coordinates) {
      const fetchByCoords = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const data = await fetchWeatherByCoords(coordinates.latitude, coordinates.longitude);
          setWeatherData(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      };
      
      fetchByCoords();
    }
  }, [coordinates]);

  // Set error from geolocation
  useEffect(() => {
    if (geoError) {
      setError(geoError);
    }
  }, [geoError]);

  // Load default location on initial render
  useEffect(() => {
    handleSearch('London');
  }, []);

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const handleRetry = () => {
    if (weatherData?.location?.name) {
      handleSearch(weatherData.location.name);
    } else {
      handleSearch('London');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-100/40 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 left-10 w-24 h-24 bg-indigo-100/40 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-sky-100/40 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <CloudSun className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent">
              WeatherNow
            </h1>
          </div>
          <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Get precise, real-time weather forecasts for any location worldwide with our advanced meteorological data
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar 
          onSearch={handleSearch}
          onCurrentLocation={handleCurrentLocation}
          loading={loading || geoLoading}
        />

        {/* Unit Toggle */}
        <div className="flex justify-center mb-12">
          <button
            onClick={toggleUnit}
            className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <Thermometer className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-gray-900">
              Switch to °{unit === 'C' ? 'F' : 'C'}
            </span>
          </button>
        </div>

        {/* Main Content */}
        <main>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : weatherData ? (
            <div className="space-y-8">
              <CurrentWeather data={weatherData} unit={unit} />
              <WeatherForecast data={weatherData} unit={unit} />
            </div>
          ) : null}
        </main>

        {/* Footer */}
        <footer className="text-center mt-20 py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Powered by WeatherAPI.com • Built with precision and care
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;