'use client';

import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import SunnyWeather from './SunnyWeather';
import RainyWeather from './RainyWeather';
import WindyWeather from './WindyWeather';
import SnowyWeather from './SnowyWeather';

interface WeatherData {
  condition: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  city: string;
}

const WeatherDisplay: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string>('auto');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/weather');
        
        if (!response.ok) {
          throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError('Failed to fetch weather data. Using mock data instead.');
        
        // Mock data as fallback
        setWeatherData({
          condition: 'Clear',
          temperature: 22.5,
          humidity: 65,
          wind_speed: 3.5,
          city: 'Tokyo'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchWeatherData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Determine which weather component to show based on condition or manual selection
  const getWeatherComponent = () => {
    if (selectedWeather !== 'auto') {
      switch (selectedWeather) {
        case 'sunny':
          return <SunnyWeather />;
        case 'rainy':
          return <RainyWeather />;
        case 'windy':
          return <WindyWeather />;
        case 'snowy':
          return <SnowyWeather />;
        default:
          return <SunnyWeather />;
      }
    }
    
    if (!weatherData) return <SunnyWeather />;
    
    const condition = weatherData.condition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
      return <RainyWeather />;
    } else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('hail')) {
      return <SnowyWeather />;
    } else if (weatherData.wind_speed > 5.5) {
      return <WindyWeather />;
    } else {
      return <SunnyWeather />;
    }
  };
  
  if (loading) {
    return <div className="text-center p-8">Loading weather data...</div>;
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Tokyo Weather</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button 
            onClick={() => setSelectedWeather('auto')}
            className={`px-4 py-2 rounded ${selectedWeather === 'auto' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Auto (Current)
          </button>
          <button 
            onClick={() => setSelectedWeather('sunny')}
            className={`px-4 py-2 rounded ${selectedWeather === 'sunny' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Sunny
          </button>
          <button 
            onClick={() => setSelectedWeather('rainy')}
            className={`px-4 py-2 rounded ${selectedWeather === 'rainy' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Rainy
          </button>
          <button 
            onClick={() => setSelectedWeather('windy')}
            className={`px-4 py-2 rounded ${selectedWeather === 'windy' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Windy
          </button>
          <button 
            onClick={() => setSelectedWeather('snowy')}
            className={`px-4 py-2 rounded ${selectedWeather === 'snowy' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Snowy
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Current Weather Card */}
        <WeatherCard
          title={weatherData ? `${weatherData.city} - ${weatherData.condition}` : 'Loading...'}
          temperature={weatherData?.temperature}
          humidity={weatherData?.humidity}
          windSpeed={weatherData?.wind_speed}
        >
          {getWeatherComponent()}
        </WeatherCard>
        
        {/* Fixed Weather Cards */}
        <WeatherCard title="Sunny Day" temperature={28} humidity={40} windSpeed={2}>
          <SunnyWeather />
        </WeatherCard>
        
        <WeatherCard title="Rainy Day" temperature={18} humidity={85} windSpeed={4}>
          <RainyWeather />
        </WeatherCard>
        
        <WeatherCard title="Windy Day" temperature={22} humidity={60} windSpeed={8}>
          <WindyWeather />
        </WeatherCard>
        
        <WeatherCard title="Snowy Day" temperature={-2} humidity={75} windSpeed={3}>
          <SnowyWeather />
        </WeatherCard>
      </div>
    </div>
  );
};

export default WeatherDisplay;
