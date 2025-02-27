import React from 'react';

const SunnyWeather: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sun */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-yellow-300 animate-pulse shadow-[0_0_70px_rgba(255,215,0,0.7)]">
        {/* Sun rays */}
        <div className="absolute inset-0 animate-spin-slow">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-12 bg-yellow-200 left-1/2 -ml-0.5 origin-bottom"
              style={{ transform: `rotate(${i * 45}deg) translateY(-32px)` }}
            />
          ))}
        </div>
      </div>
      
      {/* Background light effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-yellow-300/10 animate-pulse-slow" />
      
      {/* Small clouds */}
      <div className="absolute bottom-4 left-4 w-16 h-6 bg-white/30 rounded-full blur-sm animate-float-slow" />
      <div className="absolute bottom-8 right-8 w-20 h-8 bg-white/20 rounded-full blur-sm animate-float" />
    </div>
  );
};

export default SunnyWeather;
