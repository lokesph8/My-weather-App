import React from 'react';
import { Calendar, ArrowUp, ArrowDown, Droplets } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherForecastProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ data, unit }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900">5-Day Forecast</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {data.forecast.forecastday.map((day, index) => {
          const maxTemp = unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f;
          const minTemp = unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f;
          const precipitation = unit === 'C' ? day.day.totalprecip_mm : day.day.totalprecip_in;
          const precipUnit = unit === 'C' ? 'mm' : 'in';

          return (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <h4 className="text-gray-900 font-bold mb-4 text-lg group-hover:text-blue-700 transition-colors">
                {formatDate(day.date)}
              </h4>
              
              <img 
                src={`https:${day.day.condition.icon}`} 
                alt={day.day.condition.text}
                className="w-16 h-16 mx-auto mb-4 drop-shadow-md"
              />
              
              <p className="text-gray-700 text-sm mb-6 min-h-[2.5rem] flex items-center justify-center font-medium">
                {day.day.condition.text}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowUp className="w-4 h-4 text-red-500" />
                    <span className="text-gray-900 font-bold text-lg">
                      {Math.round(maxTemp)}°
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowDown className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600 text-lg font-semibold">
                      {Math.round(minTemp)}°
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-blue-600">
                  <Droplets className="w-4 h-4" />
                  <span className="text-gray-700 text-sm font-medium">
                    {precipitation.toFixed(1)} {precipUnit}
                  </span>
                </div>

                <div className="bg-white rounded-xl p-3 border border-gray-200">
                  <p className="text-gray-600 text-xs font-medium mb-1">Rain Chance</p>
                  <p className="text-blue-600 font-bold text-lg">
                    {day.day.daily_chance_of_rain}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};