import React from 'react';

const RainyWeather: React.FC = () => {
  // Generate random raindrops
  const raindrops = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${0.5 + Math.random() * 0.7}s`,
    opacity: 0.5 + Math.random() * 0.5,
    height: `${5 + Math.random() * 15}px`
  }));

  // Generate puddles
  const puddles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    bottom: `${Math.random() * 20}%`,
    width: `${30 + Math.random() * 40}px`,
    opacity: 0.2 + Math.random() * 0.3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-gray-700 to-gray-900">
      {/* Cloud */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-10">
        <div className="absolute w-16 h-10 bg-gray-400 rounded-full left-0 top-0" />
        <div className="absolute w-14 h-9 bg-gray-400 rounded-full left-10 top-1" />
        <div className="absolute w-12 h-8 bg-gray-400 rounded-full left-20 top-0" />
        <div className="absolute w-full h-5 bg-gray-400 rounded-full top-5" />
      </div>
      
      {/* Raindrops */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-0.5 bg-blue-200 rounded-full animate-rain"
          style={{
            left: drop.left,
            height: drop.height,
            opacity: drop.opacity,
            animationDelay: drop.animationDelay,
            animationDuration: drop.animationDuration
          }}
        />
      ))}
      
      {/* Puddles */}
      {puddles.map((puddle) => (
        <div
          key={puddle.id}
          className="absolute bg-blue-200 rounded-full animate-puddle"
          style={{
            left: puddle.left,
            bottom: puddle.bottom,
            width: puddle.width,
            height: '2px',
            opacity: puddle.opacity
          }}
        />
      ))}
    </div>
  );
};

export default RainyWeather;
