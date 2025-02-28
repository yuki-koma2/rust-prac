import React from 'react';

interface WeatherCardProps {
  title: string;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  children: React.ReactNode;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  temperature,
  humidity,
  windSpeed,
  children
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-900 text-white shadow-lg transition-all duration-300 hover:shadow-xl w-full max-w-sm">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        <div className="mb-4">
          {temperature !== undefined && (
            <p className="text-3xl font-bold mb-1">{temperature}°C</p>
          )}
          
          <div className="flex flex-wrap gap-4 text-sm opacity-80">
            {humidity !== undefined && (
              <div>
                <span className="font-semibold">Humidity:</span> {humidity}%
              </div>
            )}
            
            {windSpeed !== undefined && (
              <div>
                <span className="font-semibold">Wind:</span> {windSpeed} m/s
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
        {children}
      </div>
    </div>
  );
};

export default WeatherCard;
