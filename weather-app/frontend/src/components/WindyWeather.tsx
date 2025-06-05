import React from 'react';

const WindyWeather: React.FC = () => {
  // Generate clouds with different properties
  const clouds = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: `${10 + Math.random() * 60}%`,
    left: `${-20 - i * 5}%`, // Start off-screen to the left
    width: `${40 + Math.random() * 40}px`,
    height: `${15 + Math.random() * 10}px`,
    opacity: 0.6 + Math.random() * 0.4,
    animationDuration: `${8 + Math.random() * 7}s`,
    animationDelay: `${i * 0.5}s`
  }));

  // Generate wind lines
  const windLines = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    top: `${10 + Math.random() * 80}%`,
    left: `${-10}%`, // Start off-screen to the left
    width: `${30 + Math.random() * 70}px`,
    opacity: 0.2 + Math.random() * 0.3,
    animationDuration: `${2 + Math.random() * 3}s`,
    animationDelay: `${i * 0.2}s`
  }));

  // Generate swaying elements (like grass or leaves)
  const swayingElements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    bottom: '0',
    left: `${10 + i * 10}%`,
    height: `${15 + Math.random() * 10}px`,
    width: '2px',
    animationDuration: `${1 + Math.random()}s`
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-gray-600 to-gray-800">
      {/* Clouds moving fast */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute bg-gray-300 rounded-full animate-wind-cloud"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            height: cloud.height,
            opacity: cloud.opacity,
            animationDuration: cloud.animationDuration,
            animationDelay: cloud.animationDelay
          }}
        />
      ))}
      
      {/* Wind lines */}
      {windLines.map((line) => (
        <div
          key={line.id}
          className="absolute h-0.5 bg-gray-400 rounded-full animate-wind-line"
          style={{
            top: line.top,
            left: line.left,
            width: line.width,
            opacity: line.opacity,
            animationDuration: line.animationDuration,
            animationDelay: line.animationDelay
          }}
        />
      ))}
      
      {/* Swaying elements at the bottom (like grass) */}
      {swayingElements.map((element) => (
        <div
          key={element.id}
          className="absolute bg-green-700 origin-bottom animate-sway"
          style={{
            bottom: element.bottom,
            left: element.left,
            height: element.height,
            width: element.width,
            animationDuration: element.animationDuration
          }}
        />
      ))}
    </div>
  );
};

export default WindyWeather;
