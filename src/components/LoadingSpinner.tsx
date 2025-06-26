import React from 'react';
import { Loader2, CloudRain } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
      <div className="relative mb-8">
        <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
          <CloudRain className="w-16 h-16 text-blue-600" />
        </div>
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Fetching Weather Data</h3>
      <p className="text-gray-600 text-center max-w-md leading-relaxed">
        Getting the latest weather information for your location. This may take a few moments...
      </p>
      
      {/* Loading animation dots */}
      <div className="flex gap-2 mt-6">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
};