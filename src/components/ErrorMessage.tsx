import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-red-200 p-8 text-center">
      <div className="p-4 bg-red-100 rounded-full w-fit mx-auto mb-6">
        <AlertCircle className="w-16 h-16 text-red-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Weather Data Unavailable</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-2xl transition-all duration-200 text-white font-semibold shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      )}
      
      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
        <p className="text-gray-700 text-sm leading-relaxed">
          <strong className="text-gray-900">Setup Required:</strong> This app requires a WeatherAPI key. Please replace 'YOUR_WEATHERAPI_KEY' 
          in the weatherApi.ts file with your actual API key from{' '}
          <a 
            href="https://www.weatherapi.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            weatherapi.com
          </a>
        </p>
      </div>
    </div>
  );
};