'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Use dynamic import with no SSR for the WeatherDisplay component
// This is necessary because it uses browser APIs and client-side state
const WeatherDisplay = dynamic(
  () => import('@/components/WeatherDisplay'),
  { ssr: false }
);

const ClientWeatherApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Tokyo Weather App</h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Interactive weather visualization with animated cards
        </p>
      </header>
      
      <main className="max-w-6xl mx-auto">
        <WeatherDisplay />
      </main>
      
      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Created with Rust backend and Next.js frontend</p>
      </footer>
    </div>
  );
};

export default ClientWeatherApp;
