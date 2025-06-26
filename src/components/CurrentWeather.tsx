import React from 'react';
import { Wind, Droplets, Eye, Gauge, Thermometer, Sun, Cloud } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  const temp = unit === 'C' ? data.current.temp_c : data.current.temp_f;
  const feelsLike = unit === 'C' ? data.current.feelslike_c : data.current.feelslike_f;
  const windSpeed = unit === 'C' ? data.current.wind_kph : data.current.wind_mph;
  const windUnit = unit === 'C' ? 'km/h' : 'mph';
  const visibility = unit === 'C' ? data.current.vis_km : data.current.vis_miles;
  const visUnit = unit === 'C' ? 'km' : 'miles';

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {data.location.name}
          </h2>
          <p className="text-gray-600 text-lg">
            {data.location.region}, {data.location.country}
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={`https:${data.current.condition.icon}`} 
              alt={data.current.condition.text}
              className="w-24 h-24 drop-shadow-lg"
            />
          </div>
          <p className="text-gray-700 text-xl font-medium">
            {data.current.condition.text}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="text-center lg:text-left">
          <div className="text-7xl lg:text-8xl font-bold bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
            {Math.round(temp)}°{unit}
          </div>
          <p className="text-gray-600 text-xl">
            Feels like {Math.round(feelsLike)}°{unit}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <Wind className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700 font-semibold">Wind</span>
            </div>
            <p className="text-gray-900 text-xl font-bold">
              {Math.round(windSpeed)} {windUnit}
            </p>
            <p className="text-gray-600 text-sm">{data.current.wind_dir}</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-5 border border-cyan-100">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-6 h-6 text-cyan-600" />
              <span className="text-gray-700 font-semibold">Humidity</span>
            </div>
            <p className="text-gray-900 text-xl font-bold">{data.current.humidity}%</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-700 font-semibold">Visibility</span>
            </div>
            <p className="text-gray-900 text-xl font-bold">
              {Math.round(visibility)} {visUnit}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
            <div className="flex items-center gap-3 mb-3">
              <Gauge className="w-6 h-6 text-purple-600" />
              <span className="text-gray-700 font-semibold">Pressure</span>
            </div>
            <p className="text-gray-900 text-xl font-bold">
              {Math.round(data.current.pressure_mb)} mb
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 text-center border border-yellow-100">
          <Sun className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
          <p className="text-gray-600 text-sm mb-2 font-medium">UV Index</p>
          <p className="text-gray-900 text-2xl font-bold">{data.current.uv}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 text-center border border-blue-100">
          <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <p className="text-gray-600 text-sm mb-2 font-medium">Precipitation</p>
          <p className="text-gray-900 text-2xl font-bold">
            {unit === 'C' ? data.current.precip_mm : data.current.precip_in} 
            {unit === 'C' ? 'mm' : 'in'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-5 text-center border border-gray-100">
          <Cloud className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-600 text-sm mb-2 font-medium">Cloud Cover</p>
          <p className="text-gray-900 text-2xl font-bold">{data.current.cloud}%</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-5 text-center border border-red-100">
          <Thermometer className="w-8 h-8 text-red-600 mx-auto mb-3" />
          <p className="text-gray-600 text-sm mb-2 font-medium">Feels Like</p>
          <p className="text-gray-900 text-2xl font-bold">
            {Math.round(feelsLike)}°{unit}
          </p>
        </div>
      </div>
    </div>
  );
};