import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  onCurrentLocation: () => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onCurrentLocation, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name, country, or coordinates..."
            className="w-full px-6 py-5 pl-14 pr-40 text-lg bg-white border-2 border-gray-200 rounded-3xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-gray-400 text-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
            disabled={loading}
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={onCurrentLocation}
              disabled={loading}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-200 flex items-center gap-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4" />
              )}
              <span className="text-sm font-medium hidden sm:inline">Current</span>
            </button>
            
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 rounded-2xl transition-all duration-200 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};