import React from 'react';

const SnowyWeather: React.FC = () => {
  // Generate snowflakes with different properties
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 10}s`,
    size: `${2 + Math.random() * 4}px`,
    opacity: 0.6 + Math.random() * 0.4
  }));

  // Generate snow piles
  const snowPiles = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    left: `${10 + i * 30}%`,
    width: `${50 + Math.random() * 30}%`,
    height: `${10 + Math.random() * 15}px`
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-gray-500 to-gray-700">
      {/* Cloud */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-10">
        <div className="absolute w-16 h-10 bg-gray-300 rounded-full left-0 top-0" />
        <div className="absolute w-14 h-9 bg-gray-300 rounded-full left-10 top-1" />
        <div className="absolute w-12 h-8 bg-gray-300 rounded-full left-20 top-0" />
        <div className="absolute w-full h-5 bg-gray-300 rounded-full top-5" />
      </div>
      
      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full animate-snow"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDelay: flake.animationDelay,
            animationDuration: flake.animationDuration
          }}
        />
      ))}
      
      {/* Snow piles at the bottom */}
      {snowPiles.map((pile) => (
        <div
          key={pile.id}
          className="absolute bottom-0 bg-white rounded-t-full"
          style={{
            left: pile.left,
            width: pile.width,
            height: pile.height
          }}
        />
      ))}
    </div>
  );
};

export default SnowyWeather;
